const express = require("express");
const app = express();
const Ticket = require('./ticket');

app.use(express.static("client/build"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile('index.html');
});

app.get("/api/tickets", (req, res) => {
  const { searchText } = req.query;
  Ticket.find({})
    .then((result) => {
      if (searchText) {
        const filteredTickets = result.filter((ticket) => {
          return (
            ticket.title.toLowerCase().search(searchText.toLowerCase()) !== -1
          );
        });
        return res.json(filteredTickets);
      } else {
        return res.json(result);
      }
    })
    .catch((e) => {
      res.send(e.message);
    });
});


app.patch('/api/tickets/:id/:isDone', async (req, res )=> {
  const { id, isDone } = req.params;
  let doneValue;
  if (isDone === 'done') {
    doneValue = true;
  } else if (isDone === 'undone') {
    doneValue = false;
  } else {
    res.json( {error: 'bad request'} );
  }
  try {
    await Ticket.updateOne(
      {_id: id},
      { $set: 
        {
          done: doneValue
        }
      }
    )
    res.json({updated: true});
  } catch (e) {
    res.json(e);
  }
});





module.exports = app;
