import {
  FaCode,
  FaPaintBrush,
  FaBullhorn,
  FaPenFancy,
  FaVideo,
  FaRobot,
  FaMusic,
  FaBriefcase,
  FaUserTie,
} from "react-icons/fa";

export const categories = [
  { name: "Web Development", icon: <FaCode /> },
  { name: "Graphic Design", icon: <FaPaintBrush /> },
  { name: "Digital Marketing", icon: <FaBullhorn /> },
  { name: "Content Writing", icon: <FaPenFancy /> },
  { name: "Video Editing", icon: <FaVideo /> },
  { name: "AI Services", icon: <FaRobot /> },
  { name: "Music Production", icon: <FaMusic /> },
  { name: "Business Consulting", icon: <FaBriefcase /> },
  { name: "Virtual Assistant", icon: <FaUserTie /> },
];

export const items = [
  {
    title: "Dedicated hiring experts",
    text: "Count on an account manager to find you the right talent and see to your project’s every need.",
  },
  {
    title: "Satisfaction guarantee",
    text: "Order confidently, with guaranteed refunds for less-than-satisfactory deliveries.",
  },
  {
    title: "Advanced management tools",
    text: "Seamlessly integrate freelancers into your team and projects.",
  },
  {
    title: "Flexible payment models",
    text: "Pay only for work you approve, and release funds when you’re satisfied with the results.",
  },
];

export const inputs = [
  {
    label: "Title",
    name: "title",
    isReq: true,
  },
  {
    label: "Side Title",
    name: "shortTitle",
    isReq: true,
  },
  {
    label: "Description",
    name: "desc",
    type: "textarea",
    isReq: true,
  },
  {
    label: "Features (separate with ,)",
    name: "features",
    type: "textarea",
  },
  {
    label: "Cover",
    name: "cover",
    isReq: true,
    type: "file",
  },
  {
    label: "Images",
    name: "images",
    isReq: true,
    type: "file",
    isMulti: true,
  },
  {
    label: "Side Description",
    name: "shortDesc",
    isReq: true,
  },
  {
    label: "Revision Number",
    name: "revisionNumber",
    type: "number",
    isReq: true,
    min: 1,
  },
  {
    label: "Delivery Time",
    name: "deliveryTime",
    trype: "number",
    isReq: true,
    min: 1,
    max: 90,
  },
  {
    label: "Price ($)",
    name: "price",
    type: "number",
    isReq: true,
    min: 1,
  },
];
