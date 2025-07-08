# Bharatx_tech_task

ow to Test the Query
To test the required query:

json
Copy
Edit
POST /api/search
Content-Type: application/json

{
  "country": "US",
  "query": "iPhone 16 Pro, 128GB"
}
You can test this via:

Postman / Thunder Client

curl:

bash
Copy
Edit
curl -X POST http://localhost:3000/api/search \
  -H "Content-Type: application/json" \
  -d '{"country": "US", "query":"iPhone 16 Pro, 128GB"}'
📸 Proof of Working
✅ Below is proof that the API returns working results for:

json
Copy
Edit
{ "country": "india", "query": "iPhone 16 Pro, 128GB" }
