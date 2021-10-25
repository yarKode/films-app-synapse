import uniqid from "uniqid";
import slideImg1 from "./img/felix-mooneeram-evlkOfkQ5rE-unsplash.jpg";
import slideImg3 from "./img/michel-caicedo-9cqLeJoS46w-unsplash.jpg";
import slideImg2 from "./img/jean-philippe-delberghe-9XAnXWHu9_4-unsplash.jpg";

export const slidersContent = [
  {
    id: uniqid(),
    img: slideImg1,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
  },
  {
    id: uniqid(),
    img: slideImg2,
    title: "Duis aute irure dolor in reprehenderit",
  },
  {
    id: uniqid(),
    img: slideImg3,
    title:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis",
  },
];
