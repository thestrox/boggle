class Api::V1::BoggleController < ApplicationController
  def generate
    render json: {generate: true}
  end

  def validate
    render json: {validate: true}
  end
end
