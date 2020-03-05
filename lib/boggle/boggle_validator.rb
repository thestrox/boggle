require_relative('../en.rb')

class BoggleValidator

  # Returns true of word is formed using adjacent letter in given board
  def self.positional_valid?(word, board)
    board.each_with_index { |row, i|
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

  # Raises error if board and board's row does not respond to each 
  # or their size is not equal to given board_size
  def self.check_board_type(board, board_size)
    check_array("Board", board, board_size)
    board.each { |row|
      check_array("Board Row", row, board_size)
      row.each { |board_character| board_character = board_character.downcase }
    }
  end

  # Returns true if given word is present in dictionary word_list
  def self.word_exists?(word)
    return WORD_LIST.include?(word)
  end

  private

  def self.is_next_character_valid?(word, current_point, board)
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

  def self.is_character_match?(word_two_char, board_char)
    if (board_char)
      lower_board_char = board_char.downcase
      return word_two_char[0] == lower_board_char || (word_two_char == lower_board_char)
    else
      return false
    end
  end

  def self.possible_points(point)
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

  def self.check_array(param_name, param_value, valid_size)
    check_array_type(param_name, param_value)
    check_array_size(param_name, param_value, valid_size)
  end

  def self.check_array_type(paramName, paramValue)
    if !paramValue.respond_to?(:each)
      raise ArgumentError, "#{paramName} should be of type array"
    end
  end

  def self.check_array_size(arrayName, array, valid_size)
    if array.length != valid_size
      raise ArgumentError, "#{arrayName} should be of size #{valid_size}"
    end
  end
end
