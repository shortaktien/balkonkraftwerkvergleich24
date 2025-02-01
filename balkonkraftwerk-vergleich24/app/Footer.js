import React from "react";
import { Box, Typography, IconButton, Link, Divider, Stack } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import PodcastsIcon from '@mui/icons-material/Podcasts';
import ArticleIcon from "@mui/icons-material/Article";
import InstagramIcon from '@mui/icons-material/Instagram';
import AndroidIcon from '@mui/icons-material/Android';

export default function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      {/* Link-Bereich */}
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Link href="https://shortaktien.de" target="_blank" underline="none">
          <IconButton color="primary">
            <ArticleIcon />
          </IconButton>
          Blog
        </Link>
        <Link href="https://open.spotify.com/show/1NN6Hcc0mqI62yFEoVtZmk" target="_blank" underline="none">
          <IconButton color="primary">
            <PodcastsIcon  />
          </IconButton>
          Podcast
        </Link>
        <Link href="https://open.spotify.com/show/1NN6Hcc0mqI62yFEoVtZmk" target="_blank" underline="none">
          <IconButton color="primary">
            <AndroidIcon  />
          </IconButton>
          Android Store
        </Link>
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* Social Media Icons */}
      <Stack direction="row" justifyContent="center" spacing={2}>
        <IconButton href="https://github.com/shortaktien" target="_blank">
          <GitHubIcon />
        </IconButton>
        <IconButton href="https://x.com/shortaktien" target="_blank">
          <TwitterIcon />
        </IconButton>
        <IconButton href="https://instagram.com/probablynothing.alex" target="_blank">
          <InstagramIcon />
        </IconButton>
        <IconButton href="https://www.youtube.com/channel/UCwWv39h0e84XUsNXKqullCw" target="_blank">
          <YouTubeIcon />
        </IconButton>
        <IconButton href="https://shortaktien.de" target="_blank">
          <RssFeedIcon />
        </IconButton>
      </Stack>

      {/* Copyright */}
      <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
        © {new Date().getFullYear()} Balkonkraftwerk Vergleich by Alexander
      </Typography>
    </Box>
  );
}
