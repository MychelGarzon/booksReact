import { useEffect, useState } from 'react';
import useAxios from '../services/useAxios';
import defaultImage from "../assets/bookCover.jpg"
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Button,
  CircularProgress,
  Stack,
  Rating,
  Chip,
  Typography,
  TextField,
} from '@mui/material';
import { Link } from 'react-router-dom';




// function Books function component is used to display the books from the database.
function Books() {

  const booksUrl = 'http://localhost:3000';
  const { data, loading, get } = useAxios(booksUrl);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (data.length === 0) {
      getBooks();
    }
  }, []);

  // TODO: Replace axios with useAxios hook

  function getBooks() {
    get(`books`);
  }

  const searchHandler = (e) => {
    setSearch(e.target.value.toLowerCase());
  }
  // TODO: Implement search functionality

  return (
    <Box sx={{ mx: 'auto', p: 2 }}>

      {loading && <CircularProgress />}
      {!loading && (
        <div>
          <Stack
            sx={{ justifyContent: 'space-around' }}
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            <TextField
              id='outlined-basic'
              label='Search a book'
              variant='outlined'
              onChange={searchHandler}>
            </TextField>
            {data
              .filter((book) =>
                book.author.toLowerCase().includes(search.toLowerCase()) ||
                book.name.toLowerCase().includes(search.toLowerCase()))
              .map((book) => (
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '15%',
                    minWidth: 200,
                  }}
                  key={book.name}
                >
                  <CardMedia
                    sx={{ height: 250 }}
                    image={book.img || defaultImage}
                    title={book.name}
                    component="img"
                  />
                  <Box sx={{ pt: 2, pl: 2 }}>
                    {book.genres.map((genre, i) => (
                      <Chip
                        key={i}
                        label={genre}
                        variant="outlined"
                        size="small"
                      />
                    ))}
                    <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                      {book.name}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {book.author}
                    </Typography>
                  </Box>
                  <CardActions
                    sx={{
                      justifyContent: 'space-between',
                      mt: 'auto',
                      pl: 2,
                    }}
                  >
                    <Rating
                      name="read-only"
                      value={Number(book.stars) || 0}
                      readOnly
                      size="small"
                    />
                    <Button size="small" component={Link} to={`/${book.id}`}>Learn More</Button>

                  </CardActions>
                </Card>
              ))}
          </Stack>
        </div>
      )}
    </Box>
  );
}

export default Books;
