class ApiResponse
  attr_accessor :success, :message, :error_code, :data

  def initialize(success, message, error_code = nil, data)
    @success = success
    @message = message

    if error_code
      @error_code = error_code
    end

    @data = data
  end
end
