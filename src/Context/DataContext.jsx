import {  onValue, push, ref, remove, set, update } from "firebase/database";
import { useContext, useState, createContext } from "react";
import { toast } from "react-toastify";
import { firebaseDB } from "../helpers/firebaseConnect";
import {
  HtmlSvg,
  JsSvg,
  ReactSvg,
  BsSvg,
  SassSvg,
  MuiSvg,
} from "../assets/svg/SvgIcons";
import { useSession } from "./SessionContext";

const BlogContext = createContext();

export function useBlog() {
  return useContext(BlogContext);
}

export function BlogProvider({ children }) {
  const [currentBlogs, setCurrentBlogs] = useState();
  const [activeTopic, setActiveTopic] = useState("react");
  const [isLoading, setIsLoading] = useState(false)
  const [favoriteBlogs, setFavoriteBlogs] = useState([]);

  const {userInfo} = useSession()


  function addBlog(newBlog, dbName) {
    const blogRef = ref(firebaseDB, dbName);
    const newBlogRef = push(blogRef);
    set(newBlogRef, newBlog);
  }
  function addFavorite(newUserFavorite, dbName) {
    const blogRef = ref(firebaseDB, dbName);
    const newBlogRef = push(blogRef);
    set(newBlogRef, newUserFavorite);
  }
  function getFavorites() {
    setIsLoading(true);
      const favRef = ref(firebaseDB, "favorites/"+userInfo.uid);
      onValue(favRef, (snapshot) => {
        const data = snapshot.val();
        const favorites = [];
        for (let id in data) {
          favorites.push({ id, ...data[id] });
        }
        setFavoriteBlogs(favorites);
        setIsLoading(false);
      });
  }

  function deleteOneBlog(id, dbName) {
    remove(ref(firebaseDB, dbName + "/" + id));
    // toast("Record Deleted");
  }

  function editBlog(blog, dbName) {
    try {
      const updates = {};
      updates[dbName + "/" + blog.id] = blog;
      toast("Record Updated");
      return update(ref(firebaseDB), updates);
    } catch (error) {
      toast(error);
    }
  }

  const reactProjects = [
    {
      img: "./images/react-movie-sm.jpg",
      title: "Movie App",
      author: "@Sinan",
      details: [
        "Project aims to create a Movie App.",
        "Fetch api from TMDB",
        "Context for auth",
        "List data on landing page",
        "Show filtered data according to search terms",
        "Login function with firebase (email / with google)",
        "Guests can't see movie details",
        "Pagination",
        "BootStrap 5",
      ],
      url: "https://app.netlify.com/teams/fuatsevinc/overview",
      aim: "Private Routing, Bootstrap, Firebase auth, Context, Pagination",
    },
    {
      img: "./images/react-myblog-sm.jpg",
      title: "Blog App",
      author: "@Sinan",
      details: [
        "Firebase authentication, Realtime database",
        "State management with Redux",
        "React public and private router",
        "Blog Add, delete, update functions",
        "Styled with Material UI",
        "Guests can not see details",
        "Add favorites, comments functions",
        "Logged in users can see their favorites and contributions on Profile page",
      ],
      url: "https://app.netlify.com/teams/fuatsevinc/overview",
      aim: "Firebase auth, Realtime database, Redux, Router, Material ui, Responsive",
    },
    {
      img: "./images/react-recipe-sm.jpg",
      title: "Recipe App",
      author: "@Sinan",
      details: [
        "Using api and manipulation data",
        "Routing",
        "Simple user auth",
        "Search on api",
        "Styled-components",
      ],
      url: "https://app.netlify.com/teams/fuatsevinc/overview",
      aim: "Routing, Styled-Components, Fetch api",
    },
    {
      img: "./images/react-webtemplate-sm.jpg",
      title: "Website Template",
      author: "@Sinan",
      details: [
        "There are three pages controlled router",
        "Responsive design with css",
        "Simple Reusable Components",
        "Toastify",
      ],
      url: "https://app.netlify.com/teams/fuatsevinc/overview",
      aim: "Responsive, Router, Template",
    },
  ];
  const javascriptProjects = [
    {
      img: "./images/js-School-form.jpg",
      title: "School Registration Form",
      author: "@Sinan",
      details: [
        "Project aims to create a School & Student Registration Form.",
        "Use local storage for all data",
        "On landing page must enter School information",
        "Controls on load locale storage to fetch data",
        "Dynamic object structure",
        "Backup, Restore, Clear all functions",
        "Search function whole class or single student",
        "Delete, update, create functions",
        "A lot of controls like unique number, ascending class numbers etc",
        "Styled with Bootstrap5",
      ],
      url: "https://github.com/fuatsevinc",
      aim: "Dynamic Objects, Create Methods, Local Storage, Backups, Restore, Bootstrap, Error Handling",
    },
    {
      img: "./images/js-image-search.jpg",
      title: "Blog App",
      author: "@Sinan",
      details: [
        "Detailed Fetch api",
        "Bootstrap 5",
        "Improved Css",
        "Reusable elements",
      ],
      url: "https://github.com/fuatsevinc",
      aim: "Axios, Api details, Bootstrap, Css",
    },
    {
      img: "./images/js-calculator.jpg",
      title: "Calculator",
      author: "@Sinan",
      details: [
        "Basic Calculator",
        "Improved Dom selector, event trigger functions",
        "Improved Error Handling",
        "Math operations",
        "Real-time clock",
        "Css",
      ],
      url: "https://github.com/fuatsevinc",
      aim: "Math operations, Error handling, Clock, Events",
    },
    {
      img: "./images/js-checkout.jpg",
      title: "Checkout Page",
      author: "@Sinan",
      details: [
        "Control Dom elements",
        "Synchronization between elements on events trigger",
        "Controlled delete item",
        "Loading effect",
      ],
      url: "https://github.com/fuatsevinc",
      aim: "Reaction on events, Dom element selection, Css",
    },
  ];
  const htmlCssProjects = [
    {
      img: "./images/css-flexmedia.jpg",
      title: "Responsive Website Template",
      author: "@Sinan",
      details: ["Project aims to create a responsive template.", "Css"],
      url: "https://github.com/fuatsevinc",
      aim: "Responsive, Css",
    },
    {
      img: "./images/css-grid-page.jpg",
      title: "Grid Template",
      author: "@Sinan",
      details: ["Complicated Grid design"],
      url: "https://sinanaltundag.github.io/smallprojects/grid-page/",
      aim: "Grid design",
    },
    {
      img: "./images/css-team-members.jpg",
      title: "Team Members Page",
      author: "@Sinan",
      details: ["Improved Css", "Dark Mode", "Responsive design"],
      url: "https://github.com/fuatsevinc",
      aim: "Css, Dark mode, Responsive",
    },
    {
      img: "./images/sass-portfolio2.jpg",
      title: "Portfolio",
      author: "@Sinan",
      details: [
        "Portfolio styled with Sass",
        "Responsive design",
        "Improved Css",
      ],
      url: "https://github.com/fuatsevinc",
      aim: "Responsive, Portfolio, Sass & Scss",
    },
  ];
  //! dynamic svg control
  const skillListFrontend = [
    {
      title: "REACT",
      subjects: ["Hooks", "Styled Components", "Material UI", "Custom Hooks"],
      svg: <ReactSvg />,
    },
    {
      title: "JavaScript",
      subjects: ["DOM", "Events", "Loop Methods", "Promises", "Clean Code"],
      svg: <JsSvg />,
    },
    {
      title: "HTML5",
      subjects: ["Semantic Markup", "Forms", "Tables", "Web Storages"],
      svg: <HtmlSvg />,
    },
  ];
  const skillListStyling = [
    {
      title: "Sass",
      subjects: ["Variables", "@mixins", "@extends", "Modules"],
      svg: <SassSvg />,
    },
    {
      title: "BootStrap",
      subjects: ["Components", "Forms", "Customize", "Sass", "Responsive"],
      svg: <BsSvg />,
    },
    {
      title: "Material UI",
      subjects: [
        "Custom Components",
        "Themes",
        "Styled Components",
        "Responsive",
      ],
      svg: <MuiSvg />,
    },
  ];

  const value = {
    addBlog,
    currentBlogs,
    deleteOneBlog,
    editBlog,
    setCurrentBlogs,
    activeTopic,
    setActiveTopic,
    reactProjects,
    htmlCssProjects,
    javascriptProjects,
    skillListStyling,
    skillListFrontend,
    addFavorite,
    getFavorites,
    isLoading,
    favoriteBlogs
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
}
