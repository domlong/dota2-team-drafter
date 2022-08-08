// import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export default function ItemGrid(props) {
  return (
    <ImageList cols={3}>
      {props.items.map((x) => {
        const item = Object.values(props.itemDb).find(i => i.id === parseInt(x))
        return (
            <ImageListItem key={item.img}>
            <img
                src={`https://cdn.cloudflare.steamstatic.com/${item.img}`}
                // srcSet={`https://cdn.cloudflare.steamstatic.com/${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.dname}
                loading="lazy"
            />
            <ImageListItemBar
                title={item.dname}
                position="below"
            />
            </ImageListItem>
        )
      }
      )}
    </ImageList>
  );
}