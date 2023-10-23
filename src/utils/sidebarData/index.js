import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AlbumOutlinedIcon from "@mui/icons-material/AlbumOutlined";

const sidebarData = [
  {
    id: 1,
    title: "Home",
    path: "/",
    icon: <HomeOutlinedIcon />,
  },
  { id: 2, 
    title: "Songs", 
    path: "/songs", 
    icon: <MusicNoteOutlinedIcon /> 
  },
  { id: 3, 
    title: "Albums", 
    path: "/albums", 
    icon: <AlbumOutlinedIcon /> 
  },
  {
    id: 4,
    title: "Artists",
    path: "/artists",
    icon: <PersonOutlineOutlinedIcon />,
  },
  {
    id: 5,
    title: "favourites",
    path: "/favourites",
    icon: <FavoriteBorderOutlinedIcon />,
  },
  {
    id: 6,
    title: "Playlists",
    path: "/playlists",
    icon: <LibraryMusicOutlinedIcon />,
  },
  {
    id: 7,
    title: "Settings",
    path: "/settings",
    icon: <SettingsOutlinedIcon />,
  },
];

export default sidebarData;
