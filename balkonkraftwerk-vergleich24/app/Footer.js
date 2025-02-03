import React from "react";
import { Box, Typography, IconButton, Link, Divider, Stack, Tooltip } from "@mui/material";
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
        p: 2
      }}
    >
      {/* Link-Bereich */}
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Link href="https://shortaktien.de" target="_blank" underline="none" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ArticleIcon /> 
          <Typography variant="body2">Blog</Typography>
        </Link>
        <Link href="https://open.spotify.com/show/1NN6Hcc0mqI62yFEoVtZmk" target="_blank" underline="none" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PodcastsIcon  />
          <Typography variant="body2">Podcast</Typography>
        </Link>
        <Link href="https://play.google.com/store/apps/dev?id=7286801966082095456&hl=de" target="_blank" underline="none" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AndroidIcon  />
          <Typography variant="body2">Android Store</Typography>
        </Link>
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* Social Media Icons */}
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Tooltip title="GitHub">
          <IconButton href="https://github.com/shortaktien" target="_blank" aria-label="GitHub">
            <GitHubIcon />
          </IconButton>
        </Tooltip>
          <Tooltip title="GitHub">
          <IconButton href="https://x.com/shortaktien" target="_blank" aria-label="Twitter/X">
            <TwitterIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="GitHub">
          <IconButton href="https://instagram.com/probablynothing.alex" target="_blank" aria-label="Instagram">
            <InstagramIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="GitHub">
          <IconButton href="https://www.youtube.com/channel/UCwWv39h0e84XUsNXKqullCw" target="_blank" aria-label="YouTube">
            <YouTubeIcon />
          </IconButton>
        </Tooltip>
          <Tooltip title="GitHub">
          <IconButton href="https://shortaktien.de" target="_blank" aria-label="Feed">
            <RssFeedIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      {/* Copyright */}
      <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
        © {new Date().getFullYear()} Balkonkraftwerk Vergleich by Alexander
      </Typography>
    </Box>
  );
}
