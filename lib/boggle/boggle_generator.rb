require_relative('../dice.rb')

class BoggleGenerator

    # Returns the randomly generated board of given board_size * board_size
    def self.get_randomize_board(board_size)
        # Shuffle the DICE
        DICES.shuffle
        dice_faces = []
    
        DICES.each do |dice|
          dice_faces.push(dice.sample)
        end
    
        return dice_faces.each_slice(board_size).to_a
      end
end