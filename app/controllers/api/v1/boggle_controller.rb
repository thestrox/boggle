BOARD_SIZE = 4

class Api::V1::BoggleController < ApplicationController
  skip_before_action :verify_authenticity_token

  def generate
    dices = get_randomize_dice_faces(BOARD_SIZE)

    # Renders JSON data of form BOARD_SIZE * BOARD_SIZE
    render(    json: ApiResponse.new(true, "Board is Initialized", {board: dices.each_slice(BOARD_SIZE).to_a}),     status: 200)
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
          check_board_type("Board", board, BOARD_SIZE)
          board.each { |row|
            check_board_type("Board Row", row, BOARD_SIZE)
            row.each { |board_character| board_character = board_character.downcase }
          }
        rescue ArgumentError => e
          is_valid = false
          message = "Error: #{e.message}."
          status = 400
        end
      end
    end

      # Validate position of word in board
    if is_valid && !positional_valid?(word, board)
      is_valid = false
      message = "Error: Word is not formed from adjacent letter."
      status = 400
    end

    if is_valid

      # Request is succes if control reaches here, failure otherwise
      if !word_exists?(word)
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

  private

  def get_randomize_dice_faces(size)
    # Shuffle the DICE
    DICES.shuffle
    dice_faces = []

    DICES.each do |dice|
      dice_faces.push(dice.sample)
    end

    return dice_faces
  end

  def positional_valid?(word, board)
    # check_board_type("Board", board, BOARD_SIZE)
    board.each_with_index { |row, i|

      # check_board_type("Board Row", row, BOARD_SIZE)
      row.each_with_index { |board_character, j|

        if is_character_match?(word[0, 2], board_character)
          if is_next_character_valid?(word, Point.new(i, j), board)
            return true
          end
        end

      }
    }
    return false
  end

  def is_next_character_valid?(word, current_point, board)
    current_character = word[0]
    is_current_q = current_character == "q"

    if (word.length == 1 || (is_current_q && word.length == 2))
      return true
    end

    next_two_character = is_current_q ? word[2, 2] : word[1, 2]
    new_board = board.deep_dup
    new_board[current_point.row][current_point.col] = nil
    possible_points(current_point).each { |point|

      if is_character_match?(next_two_character, new_board[point.row][point.col])
        if is_next_character_valid?(is_current_q ? word[2..-1] : word[1..-1], point, new_board)
          return true
        end
      end

    }
    return false
  end

  def is_character_match?(word_two_char, board_char)
    if (board_char)
      lower_board_char = board_char.downcase
      return word_two_char[0] == lower_board_char || (word_two_char == lower_board_char)
    else
      return false
    end
  end

  def possible_points(point)
    points = []
    row_minus = point.row - 1
    row_plus = point.row + 1
    col_minus = point.col - 1
    col_plus = point.col + 1

    # Check for Top
    if (row_minus >= 0)
      points.push(Point.new(row_minus, point.col))

      # Check for Top Right
      if (col_plus < BOARD_SIZE)
        points.push(Point.new(row_minus, col_plus))
      end

      # Check for Top Left
      if (col_minus >= 0)
        points.push(Point.new(row_minus, col_minus))
      end
    end

    # Check for Bottom
    if (row_plus < BOARD_SIZE)
      points.push(Point.new(row_plus, point.col))

      #Check for Bottom Right
      if (col_plus < BOARD_SIZE)
        points.push(Point.new(row_plus, col_plus))
      end

      #Check for Bottom Left
      if (col_minus >= 0)
        points.push(Point.new(row_plus, col_minus))
      end
    end

    #Check for Right
    if (col_plus < BOARD_SIZE)
      points.push(Point.new(point.row, col_plus))
    end

    #Check for Left
    if (col_minus >= 0)
      points.push(Point.new(point.row, col_minus))
    end

    return points
  end

  def word_exists?(word)
    return WORD_LIST.include?(word)
  end

  def check_board_type(paramName, paramValue, valid_size)
    check_array_type(paramName, paramValue)
    check_array_size(paramName, paramValue, valid_size)
  end

  def check_array_type(paramName, paramValue)
    if !paramValue.respond_to?(:each)
      raise ArgumentError, "#{paramName} should be of type array"
    end
  end

  def check_array_size(arrayName, array, valid_size)
    if array.length != valid_size
      raise ArgumentError, "#{arrayName} should be of size #{valid_size}"
    end
  end
end
