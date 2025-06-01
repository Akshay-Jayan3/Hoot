import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AlbumOutlinedIcon from "@mui/icons-material/AlbumOutlined";

const sidebarData = [
  { id: 1, 
    title: "Songs", 
    path: "/", 
    icon: <MusicNoteOutlinedIcon /> 
  },
  { id: 2, 
    title: "Albums", 
    path: "/albums", 
    icon: <AlbumOutlinedIcon /> 
  },
  {
    id: 3,
    title: "Artists",
    path: "/artists",
    icon: <PersonOutlineOutlinedIcon />,
  },
  {
    id: 4,
    title: "Favourites",
    path: "/favourites",
    icon: <FavoriteBorderOutlinedIcon />,
  },
  {
    id: 5,
    title: "Playlists",
    path: "/playlists",
    icon: <LibraryMusicOutlinedIcon />,
  },
  {
    id: 6,
    title: "Settings",
    path: "/settings",
    icon: <SettingsOutlinedIcon />,
  },
];

export default sidebarData;
