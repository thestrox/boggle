BOARD_SIZE = 4
GAME_DURATION = 180000

class Api::V1::BoggleController < ApplicationController
  skip_before_action :verify_authenticity_token

  def generate
    board = BoggleGenerator.get_randomize_board(BOARD_SIZE)

    # Renders JSON data of form BOARD_SIZE * BOARD_SIZE
    render(    json: ApiResponse.new(true, "Board is Initialized", {board: board, duration: GAME_DURATION}),     status: 200)
  end

  def validate_word
    board = params[:board]
    word = params[:word]
    message = ""
    success = true
    status = 200
    is_valid = true

    if board.nil? || word.nil?
      is_valid = false
      message = "Bad Request. Either board or word is not available"
      status = 400
    end

    if is_valid

      # clean word
      word = word.strip.downcase

      if word.length < 3
        is_valid = false
        message = "Error: Minimum word length is 3"
        status = 400
      else

      # validate board
        begin
          BoggleValidator.check_board_type(board, BOARD_SIZE)
        rescue ArgumentError => e
          is_valid = false
          message = "Error: #{e.message}."
          status = 400
        end
      end
    end

      # Validate position of word in board
    if is_valid && !BoggleValidator.positional_valid?(word, board)
      is_valid = false
      message = "Error: Word is not formed from adjacent letter."
      status = 400
    end

    if is_valid

      # Request is succes if control reaches here, failure otherwise
      if !BoggleValidator.word_exists?(word)
        is_valid = false
        message = "Given word is not an English word."
      else
        message = "Given word is valid English word"
      end

    else
      success = false
    end

    render(    json: ApiResponse.new(success, message, {score: is_valid ? word.length : nil}),     status: status)
  end
end
