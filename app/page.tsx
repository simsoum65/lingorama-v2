import FacadeHero from "@/components/facade3d/FacadeHero";
import USPs from "@/components/sections/USPs";
import Categories from "@/components/sections/Categories";
import WeaveCompare from "@/components/sections/WeaveCompare";
import ToolsTeasers from "@/components/sections/ToolsTeasers";
import Brands from "@/components/sections/Brands";
import HeritageTeaser from "@/components/sections/HeritageTeaser";
import Reviews from "@/components/sections/Reviews";
import ProTeaser from "@/components/sections/ProTeaser";

export default function Home() {
  return (
    <>
      <FacadeHero />
      <USPs />
      <Categories />
      <WeaveCompare />
      <ToolsTeasers />
      <Brands />
      <HeritageTeaser />
      <Reviews />
      <ProTeaser />
    </>
  );
}
