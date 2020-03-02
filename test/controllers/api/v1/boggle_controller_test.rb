require 'test_helper'

VALID_BOARD = [
  ["o", "n", "e", "a"], 
  ["b", "c", "d", "e"], 
  ["f", "g", "h", "i"], 
  ["j", "k", "l", "m"]
]

GENERATE_ENDPOINT = "/api/v1/boggle"
VALIDATE_ENDPOINT = "/api/v1/boggle/validate"

class Api::V1::BoggleControllerTest < ActionDispatch::IntegrationTest
  test "should generate random 4*4 board" do
    get GENERATE_ENDPOINT
    assert_response :success

    json = JSON.parse(response.body)
    
    assert_equal "Board is Initialized", json["message"]

    board = json["data"]["board"]
    assert_equal 4, board.length

    board.each {|row|
      assert_equal 4, row.length
    }
  end
end

class Api::V1::BoggleControllerTest < ActionDispatch::IntegrationTest
  test "should validate the given word and return score" do
    post VALIDATE_ENDPOINT, params: {board: VALID_BOARD , word: "one"}, as: :json
    assert_response :success

    json = JSON.parse(response.body)

    assert_equal 3, json["data"]["score"]
  end
end

class Api::V1::BoggleControllerTest < ActionDispatch::IntegrationTest
  test "should return 400 for empty board" do
    post VALIDATE_ENDPOINT, params: {word: "one"}, as: :json
    assert_response 400
  end
end

class Api::V1::BoggleControllerTest < ActionDispatch::IntegrationTest
  test "should return 400 for empty word" do
    post VALIDATE_ENDPOINT, params: {board: VALID_BOARD}, as: :json
    assert_response 400
  end
end

class Api::V1::BoggleControllerTest < ActionDispatch::IntegrationTest
  test "should return 400 and display error when word length is less than 3" do
    post VALIDATE_ENDPOINT, params: {board: VALID_BOARD, word: "on"}, as: :json
    assert_response 400

    json = JSON.parse(response.body)

    assert_equal "Error: Minimum word length is 3", json["message"]
  end
end

class Api::V1::BoggleControllerTest < ActionDispatch::IntegrationTest
  test "should return 400 and display error when board data type is not array" do
    post VALIDATE_ENDPOINT, params: {board: "invalid board as string", word: "one"}, as: :json
    assert_response 400

    json = JSON.parse(response.body)

    assert_equal "Error: Board should be of type array.", json["message"]
  end
end

class Api::V1::BoggleControllerTest < ActionDispatch::IntegrationTest
  test "should return 400 and display error when board length is not 4" do
    post VALIDATE_ENDPOINT, params: {board: VALID_BOARD.take(3), word: "one"}, as: :json
    assert_response 400

    json = JSON.parse(response.body)

    assert_equal "Error: Board should be of size 4.", json["message"]
  end
end

class Api::V1::BoggleControllerTest < ActionDispatch::IntegrationTest
  test "should return 400 and display error when board row data type is not array" do
    post VALIDATE_ENDPOINT, params: {board: ["a", "b", "c", "d"], word: "one"}, as: :json
    assert_response 400

    json = JSON.parse(response.body)

    assert_equal "Error: Board Row should be of type array.", json["message"]
  end
end

class Api::V1::BoggleControllerTest < ActionDispatch::IntegrationTest
  test "should return 400 and display error when board row length is not 4" do
    post VALIDATE_ENDPOINT, params: {board: [["o", "n", "e", "a"], ["b", "c", "d", "e"], ["f", "g", "h", "i"], ["j", "k", "l"]], word: "one"}, as: :json
    assert_response 400

    json = JSON.parse(response.body)

    assert_equal "Error: Board Row should be of size 4.", json["message"]
  end
end

class Api::V1::BoggleControllerTest < ActionDispatch::IntegrationTest
  test "should return 400 and display error when word is not positionally valid" do
    post VALIDATE_ENDPOINT, params: {board: VALID_BOARD, word: "hill"}, as: :json
    assert_response 400

    json = JSON.parse(response.body)

    assert_equal "Error: Word is not formed from adjacent letter.", json["message"]
  end
end

class Api::V1::BoggleControllerTest < ActionDispatch::IntegrationTest
  test "should return 200, but score should be null when word is not an english word" do
    post VALIDATE_ENDPOINT, params: {board: VALID_BOARD, word: "oncdaeim"}, as: :json
    assert_response 200

    json = JSON.parse(response.body)

    assert_nil json["data"]["score"]
    assert_equal "Given word is not an English word.", json["message"]
  end
end