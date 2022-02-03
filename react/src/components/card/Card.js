import React from 'react';
import {
  Box,
  Typography,
  Link,
  Grid,
  Card,
  CardActions,
  CardContent,
} from '@mui/material';
import Image from 'mui-image';
import 'components/card/card.scss';

export default function Cards(props) {
  const { props: cards } = props;

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      className="cards-grid"
    >
      {cards.map((card) => {
        return (
          <Grid
            key={card.id}
            item
            xs={12}
            sm={2}
            md={4}
            className="cards-grid__item"
          >
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 2,
              }}
              raised
              className="card"
            >
              <Image
                key={card.Image.id}
                src={process.env.REACT_APP_IMAGES_ENDPOINT + card.Image.url}
                alt={card.Image.alternativeText}
                title={card.Image.caption}
                fit="contain"
                showLoading
                duration={500}
                width="75%"
                className="card__image"
              />
              <CardContent className="card-content">
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="card-content__heading"
                >
                  {card.Heading}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="card-content__description"
                >
                  {card.Description}
                </Typography>
              </CardContent>
              <CardActions className="card-actions">
                <Link
                  variant="button"
                  href={card.Button.Link}
                  target="_blank"
                  sx={{
                    // display: 'block',
                    // width: '100%',
                    p: 2,
                    fontSize: 16,
                    color: 'white',
                    backgroundColor: (theme) => theme.palette.primary.main,
                  }}
                  className="card-link"
                >
                  {card.Button.Text}
                </Link>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
