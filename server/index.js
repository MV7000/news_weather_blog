const express = require('express');
const mongoose = require('mongoose');

const DataModel = require('./DataModel');
const connectDB = require('./DataBase');
connectDB();

const app = express();

app.use(express.json({ extended: true }));

const cors = require('cors');

app.use(cors());

app.get('/readFromServer', (req, res) => {
  res.json({
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste veritatis dolores quaerat corrupti itaque ab quos alias amet soluta aliquam totam dignissimos nesciunt ipsa nulla aut natus, vitae laborum! Quae? Obcaecati asperiores reprehenderit praesentium illo. Tempore dicta, impedit esse beatae molestias veniam dignissimos maxime velit! Fuga dignissimos iusto, voluptas dolores illum quo quos nihil eligendi eum debitis veritatis perferendis enim. Commodi sequi modi numquam doloremque assumenda tempora cum aut velit et, nemo nostrum, repellendus rerum quaerat ipsa aliquid quod eos optio dignissimos est rem, vel at veritatis iste! Labore, eaque. Ipsa distinctio harum aliquid quia, iure nisi accusantium minus ea tempore saepe, laboriosam excepturi repellat in odio. Impedit repudiandae a fugiat dolore culpa. Mollitia ea animi debitis voluptatum inventore minus. Inventore assumenda perferendis cupiditate ducimus quasi cumque beatae exercitationem molestiae quas nam itaque commodi ipsa, cum aut dignissimos ipsam temporibus odio voluptate unde excepturi! Assumenda velit dolore magni unde qui. Totam nostrum praesentium nemo, ex asperiores qui aut eligendi laboriosam quisquam unde est dolores dicta voluptate sapiente perspiciatis doloremque quis possimus quae esse placeat cumque laborum, vero corporis molestias? Voluptatibus? Facilis vero iusto corporis expedita qui voluptates, aspernatur nihil tenetur rerum eos possimus porro quasi maiores in. Praesentium, voluptatum quas incidunt perferendis aliquid officia expedita reprehenderit deserunt. Aut, adipisci accusamus! Saepe iure, tempora nobis, ab aspernatur quas, fuga aliquid perferendis suscipit provident eum deleniti ipsa minus architecto ea corrupti molestiae! Est dignissimos molestias alias quae sunt mollitia, voluptate nisi natus? Necessitatibus ab eos praesentium voluptatibus animi, cum cumque dolores, soluta unde doloribus eum beatae, ipsum ut sint et! Repellendus nisi eius officia eveniet, hic consectetur excepturi itaque iure. Omnis, esse! Placeat voluptatum perspiciatis possimus, quam voluptates ullam voluptatem cupiditate nisi ex doloribus unde, laboriosam soluta fugiat recusandae error inventore tempore amet molestias molestiae consectetur debitis iusto dolor laborum? Accusantium, porro!',
  });
});

app.get('/getData-blog', async (req, res) => {
  try {
    const collection = mongoose.connection.db.collection('Blog');

    const cursor = collection.find({ SessionId: req.query.session_id });

    const transcripts = await cursor.toArray();

    res.json(transcripts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const DataClean = mongoose.model('DataModel');

app.post('/write-item', async (req, res) => {
  try {
    const { content } = req.body;
    const newData = new DataModel({ content });
    await newData.save();
    console.log(res.json({ message: 'Succesfull saving' }));
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error during save the DATA');
  }
});

app.delete('/delete-item/:id', async (req, res) => {
  const itemId = req.params.id;
  console.log(itemId);
  try {
    await DataClean.deleteOne({ _id: itemId }),
      (err, res) => {
        console.log(err);
      };
    res.send({ status: 'Ok', data: 'Deleted' });
  } catch (error) {
    console.log(error.message);
  }
});

app.get('/find-item/:id', async (req, res) => {
  const itemId = req.params.id;

  const result = DataClean.findOne({ _id: itemId })
    .then(item => {
      res.send(item);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

app.get('/pagination', async (req, res) => {
  const allData = await DataClean.find({});

  const pageNumber = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const firstInd = (pageNumber - 1) * limit;
  const lastInd = pageNumber * limit;

  const results = {};
  results.totalBlogs = allData.length;
  results.totalPages = Math.ceil(allData.length / limit);

  if (lastInd < allData.length) {
    results.next = {
      pageNumber: pageNumber + 1,
    };
  }
  if (firstInd > 0) {
    results.prev = {
      pageNumber: pageNumber - 1,
    };
  }

  results.result = allData.slice(firstInd, lastInd);
  res.json(results);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
