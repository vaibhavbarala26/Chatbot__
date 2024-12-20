import {
    GoogleGenerativeAI,
    
  }  from "@google/generative-ai";

  const genAI = new GoogleGenerativeAI(process.env.API_KEY);


  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(prompt) {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "you are a chatbot integrated to the ecommerce website so you take the queries of the users and so you analyse  the query and breaks it into small part like category of the electronics (like smartphone , laptop , smartwatch) , brand of the electronics(like samsung , apple , dell , lenovo) , the miniprice (if not given let it be 0) , the maximumprice (if not given let it be 10000) , rating for the electronics item (must be smaller than 5)  for the http request to the backend  and your response should be a javascript object which should be in the json  format  {category: \"gaming laptop\",max_price: 1000,min_price: 0,instock: true,brand: \"Samsung\",name: \"Galaxy\",rating: 4.5};, breakdown of the query is likea user ask the query give me the best smartphones under the price of 500 so you break the query in this formatconst productFilters = {category: \"smartphone \",max_price: 500,};because other things are not mentioned and also mobile mobilephones categorise them as smartphone watches or smartwatches to smart watch and give response in json format also keep in mind that is the user is asking for  also if a user ask to add a product to cart give response in json like {\"cart\" :\"yes\"}\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, I understand. I will analyze the user's query, extract the relevant information, and format it into a JSON object suitable for a backend request. I'll also handle cart-related requests.\n\nHere's how I'll process the queries and generate the JSON responses:\n\n**Logic:**\n\n1.  **Category Extraction:** I will look for keywords like \"smartphone,\" \"laptop,\" \"smartwatch,\" \"tablet,\" \"headphones,\" etc. to determine the category. \"Mobile phone\" or \"mobile\" will be treated as \"smartphone\".\n2.  **Brand Extraction:** I will identify brand names like \"Samsung,\" \"Apple,\" \"Dell,\" \"Lenovo,\" etc. If the brand is not found I will not add to the json .\n3.  **Price Range Extraction:** I will look for phrases like \"under,\" \"less than,\" \"up to,\" \"between,\" \"from,\" and extract numerical values for `min_price` and `max_price`. If not found, `min_price` defaults to 0 and `max_price` defaults to 10000.\n4.  **Rating Extraction:** Look for ratings keywords like \"rating of\" and extract the numerical value of rating. Must be less than 5.\n5.  **Cart Handling:** If the query contains words like \"add to cart,\" I will respond with `{\"cart\": \"yes\"}`.\n6.  **Default Values:** If no specific category is mentioned, it will be left empty or can set to all products, if no price is given default minprice to 0 and maxprice to 10000 and rating must be smaller than 5.\n7.   **Instock :** if user doesnot specify instock then instock is true.\n8.   **Name :** If user specify the name of the product then add to json .\n9.   **Json Formatting**: Output will always be in json format as required.\n\n**Examples:**\n\n**User Input:** \"Show me the best Samsung smartphones under 500.\"\n\n**JSON Output:**\n\n```json\n{\n  \"category\": \"smartphone\",\n  \"max_price\": 500,\n  \"min_price\": 0,\n  \"brand\": \"Samsung\",\n  \"instock\": true\n}\n```\n**User Input:** \"I want a gaming laptop between 1000 and 1500 with a rating of 4\"\n**JSON Output:**\n```json\n{\n   \"category\": \"gaming laptop\",\n  \"max_price\": 1500,\n  \"min_price\": 1000,\n   \"rating\": 4,\n   \"instock\":true\n}\n```\n\n**User Input:** \"Add this to my cart please.\"\n\n**JSON Output:**\n\n```json\n{\n  \"cart\": \"yes\"\n}\n```\n**User Input:** \"Show me laptops from dell with rating of 4.5\"\n**JSON Output:**\n```json\n{\n   \"category\": \"laptop\",\n    \"brand\": \"dell\",\n    \"rating\":4.5,\n    \"min_price\": 0,\n    \"max_price\": 10000,\n     \"instock\":true\n}\n```\n**User Input:** \"I am looking for Galaxy smartwatches\"\n\n**JSON Output:**\n```json\n{\n\"category\": \"smartwatch\",\n\"brand\": \"Samsung\",\n \"name\": \"Galaxy\",\n \"min_price\": 0,\n \"max_price\": 10000,\n \"instock\": true\n}\n```\n**User Input :** \"Show me all products\"\n**JSON Output:**\n```json\n{\n   \"category\":\"\",\n   \"min_price\": 0,\n   \"max_price\": 10000,\n   \"instock\": true\n}\n```\n\n**User Input:** \"Give me a smart watch\"\n\n**JSON Output:**\n```json\n{\n  \"category\": \"smartwatch\",\n   \"min_price\": 0,\n    \"max_price\": 10000,\n    \"instock\": true\n}\n```\n\n**Now, I'm ready to receive your queries!**\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "add this product to cart"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"cart\": \"yes\"\n}\n```\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "give me smartphones under 1000\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"category\": \"smartphone\",\n  \"max_price\": 1000,\n  \"min_price\": 0,\n   \"instock\":true\n}\n```\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "give me laptops under 5000\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"category\": \"laptop\",\n  \"max_price\": 5000,\n  \"min_price\": 0,\n  \"instock\":true\n}\n```\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "give me smartwatches under 500\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"category\": \"smartwatch\",\n  \"max_price\": 500,\n  \"min_price\": 0,\n  \"instock\":true\n}\n```\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "give me watches under 1000\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"category\": \"smartwatch\",\n  \"max_price\": 1000,\n  \"min_price\": 0,\n  \"instock\":true\n}\n```\n"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage(prompt);
    const length = result.response.text().length
    const data = result.response.text().slice(7 , length-4)
    const results = JSON.parse(data)
    return results
  }
  
  export default run