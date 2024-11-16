## Running the app

```bash
git clone https://github.com/2d0r/planning-permission-checker-2.git
cd planning-permission-checker-2/client
npm i
npm run dev
# open another terminal
cd path/to/planning-permission-checker-2/server
python3 server.py
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Approach

Stack:
- front-end: next.js, tailwind
- back-end: python, flask

The backend loads and sends the database to the client, via API request, to populate the form.
Once the user interacts with the form, an API request is sent to the python/flask server. 
Here I use pandas to convert the mock database into a dataframe, and use the answers to filter it and retrieve the needed information.

