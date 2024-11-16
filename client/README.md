## Running the app

```bash
git clone https://github.com/2d0r/planning-permission-checker-2.git
cd planning-permission-checker-2/client
npm i
npm run dev
cd ../server
python3 server.py
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Approach

Stack:
- front-end: next.js, tailwindCSS
- back-end: python, flask

I chose this stack as Next.js is a modern framework, very popular for web applications, which I am familiar with.
I simplified and converted the spreadsheet to a json.

The backend loads and sends the database to the client, via API request, to populate the form.
Once the user interacts with the form, an API request is sent to the python/flask server. 
Here I use pandas to convert the mock database into a dataframe, and use the answers to filter it and retrieve the needed information.

