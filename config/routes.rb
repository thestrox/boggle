  # Put endpoints in /api/v1/
Rails.application.routes.draw do
  namespace(:api,   defaults: {format: "json"}) do
    namespace(:v1) do
      get("boggle",       to: "boggle#generate")
      post("boggle/validate",       to: "boggle#validate_word")
    end
  end

  # Foward all non xhr and html requests to index page
  get("*page",   to: "static#index",   constraints: -> (req) do
    !req.xhr? && req.format.html?
end)

  #Make index root
  root("static#index")
end
