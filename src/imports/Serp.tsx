import svgPaths from "./svg-wcdo3zh12x";
import imgImage from "figma:asset/6d9373bf8007ceb4582f0039aafba600504b8e9a.png";
import imgImage1 from "figma:asset/67fda4d003ce7d97cd5510ff30af95756a01447b.png";
import img44 from "figma:asset/4435f1f011413a09fd556f36409cc5868f7b419e.png";
import imgImage2 from "figma:asset/09003042cdb3ea96779e5f490867810a7a10ad9c.png";
import imgImage3 from "figma:asset/92fe7c7a065cfa5df2a8265fcbddcf2fa915d345.png";
import imgImage4 from "figma:asset/d0da4f4370fdbda3cead0fb48538cdb07861254b.png";
import imgImage5 from "figma:asset/aca96d2cfa99440b037b21eca5ce0057d3bb6ddb.png";
import imgImage6 from "figma:asset/fc0c8c319d7d3d8ed020642540057e268d029f12.png";
import imgImage7 from "figma:asset/a465b7e9104ffb250fbb0ff1e4dbeded146bae47.png";
import imgHoverImage from "figma:asset/31700d7a9cecd643ca9b3301ef8834e779e2270c.png";
import imgHoverImage1 from "figma:asset/6ed8085af55d46d4cbd04fa912387ace65ad84a4.png";
import imgPlaceholder from "figma:asset/98ab4e54017e37df1cb24e1c550f3c6f515fdf60.png";

function LogoMicrosoftBing() {
  return (
    <div className="h-[18.4px] relative shrink-0 w-[116px]" data-name="Logo/Microsoft Bing">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 116 18.4">
        <g id="Icon / Brand / Microsoft Bing">
          <path d={svgPaths.p1b3c6e00} fill="var(--fill-0, #77787B)" id="Vector" />
          <g id="Group">
            <path d={svgPaths.p10797200} fill="var(--fill-0, #F26522)" id="Vector_2" />
            <path d={svgPaths.p35e60f00} fill="var(--fill-0, #8DC63F)" id="Vector_3" />
            <path d={svgPaths.p3ff34e00} fill="var(--fill-0, #00AEEF)" id="Vector_4" />
            <path d={svgPaths.p2e909900} fill="var(--fill-0, #FFC20E)" id="Vector_5" />
          </g>
          <g id="Bing">
            <path d={svgPaths.p39652a80} fill="var(--fill-0, #77787B)" />
            <path d={svgPaths.pa62acf0} fill="var(--fill-0, #77787B)" />
            <path d={svgPaths.paa5a700} fill="var(--fill-0, #77787B)" />
            <path d={svgPaths.p2053b500} fill="var(--fill-0, #77787B)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function IconsSearch() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icons/Search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icons/Search">
          <path d={svgPaths.p37ee9180} fill="var(--fill-0, black)" fillOpacity="0.6" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function IconContainer() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[20px]" data-name="Icon Container">
      <IconsSearch />
    </div>
  );
}

function TextField() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="Text Field">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[22px] overflow-ellipsis overflow-hidden relative shrink-0 text-[16px] text-black text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Whale images
      </p>
    </div>
  );
}

function SearchInput() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Search Input">
      <IconContainer />
      <TextField />
    </div>
  );
}

function IconsMic() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icons/Mic">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icons/Mic">
          <path d={svgPaths.p5fb3300} fill="var(--fill-0, #4F6BED)" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function IconContainer1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[16px]" data-name="Icon Container">
      <IconsMic />
    </div>
  );
}

function SearchBoxIconButton() {
  return (
    <div className="content-stretch flex flex-col items-start p-[4px] relative shrink-0" data-name="Search box icon button">
      <IconContainer1 />
    </div>
  );
}

function IconsSearchVisual() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icons/Search Visual">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icons/Search Visual">
          <path d={svgPaths.p1ad03880} fill="var(--fill-0, #4F6BED)" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function IconContainer2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[16px]" data-name="Icon Container">
      <IconsSearchVisual />
    </div>
  );
}

function SearchBoxIconButton1() {
  return (
    <div className="content-stretch flex flex-col items-start p-[4px] relative shrink-0" data-name="Search box icon button">
      <IconContainer2 />
    </div>
  );
}

function SearchBoxButtonGroup() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Search Box Button Group">
      <SearchBoxIconButton />
      <SearchBoxIconButton1 />
    </div>
  );
}

function SearchBox() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center px-[16px] py-[12px] relative rounded-[9999px] shrink-0 w-[650px]" data-name="Search Box">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[9999px] shadow-[0px_2px_4px_1px_rgba(0,0,0,0.1),0px_0px_0px_1px_rgba(0,0,0,0.05)]" />
      <SearchInput />
      <SearchBoxButtonGroup />
    </div>
  );
}

function Form() {
  return (
    <div className="content-stretch flex gap-[24px] items-center pl-[24px] pr-0 py-0 relative shrink-0" data-name="Form">
      <LogoMicrosoftBing />
      <SearchBox />
    </div>
  );
}

function Copilot() {
  return (
    <div className="absolute inset-[6.25%_0]" data-name="Copilot">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 29.75">
        <g id="Copilot">
          <path d={svgPaths.p2a394300} fill="url(#paint0_radial_1_73589)" id="Shape" />
          <path d={svgPaths.p4db00} fill="url(#paint1_radial_1_73589)" id="Shape_2" />
          <g id="Shape_3">
            <path d={svgPaths.p3216f580} fill="url(#paint2_linear_1_73589)" />
            <path d={svgPaths.p3216f580} fill="url(#paint3_linear_1_73589)" />
          </g>
          <g id="Shape_4">
            <path d={svgPaths.p22220800} fill="url(#paint4_radial_1_73589)" />
            <path d={svgPaths.p22220800} fill="url(#paint5_linear_1_73589)" />
          </g>
        </g>
        <defs>
          <radialGradient cx="0" cy="0" gradientTransform="matrix(-8.54236 -10.6351 -9.22298 8.92039 27.8049 13.1174)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_73589" r="1">
            <stop offset="0.0955758" stopColor="#00AEFF" />
            <stop offset="0.773185" stopColor="#2253CE" />
            <stop offset="1" stopColor="#0736C4" />
          </radialGradient>
          <radialGradient cx="0" cy="0" gradientTransform="matrix(7.56972 9.39931 8.93587 -7.67191 7.02598 21.3904)" gradientUnits="userSpaceOnUse" id="paint1_radial_1_73589" r="1">
            <stop stopColor="#FFB657" />
            <stop offset="0.633728" stopColor="#FF5F3D" />
            <stop offset="0.923392" stopColor="#C02B3C" />
          </radialGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_1_73589" x1="8.11419" x2="9.88235" y1="2.7045" y2="23.1621">
            <stop offset="0.156162" stopColor="#0D91E1" />
            <stop offset="0.487484" stopColor="#52B471" />
            <stop offset="0.652394" stopColor="#98BD42" />
            <stop offset="0.937361" stopColor="#FFC800" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint3_linear_1_73589" x1="9.65975" x2="10.6253" y1="-1.46664e-08" y2="22.32">
            <stop stopColor="#3DCBFF" />
            <stop offset="0.246674" stopColor="#0588F7" stopOpacity="0" />
          </linearGradient>
          <radialGradient cx="0" cy="0" gradientTransform="matrix(-9.79205 27.9918 -33.326 -12.3542 30.3845 5.24746)" gradientUnits="userSpaceOnUse" id="paint4_radial_1_73589" r="1">
            <stop offset="0.0661714" stopColor="#8C48FF" />
            <stop offset="0.5" stopColor="#F2598A" />
            <stop offset="0.895833" stopColor="#FFB152" />
          </radialGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint5_linear_1_73589" x1="31.3637" x2="31.3511" y1="6.06997" y2="12.1485">
            <stop offset="0.0581535" stopColor="#F8ADFA" />
            <stop offset="0.708063" stopColor="#A86EDD" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function IconsCopilot() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Icons/Copilot">
      <Copilot />
    </div>
  );
}

function IconContainer3() {
  return (
    <div className="basis-0 content-stretch flex grow h-full items-center justify-center min-h-px min-w-px relative shrink-0" data-name="Icon Container">
      <IconsCopilot />
    </div>
  );
}

function CopilotButton() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[34px]" data-name="Copilot Button">
      <IconContainer3 />
    </div>
  );
}

function Layer() {
  return (
    <div className="absolute h-[19px] left-[calc(50%-1.5px)] top-[calc(50%-0.5px)] translate-x-[-50%] translate-y-[-50%] w-[17px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 19">
        <g clipPath="url(#clip0_1_73699)" id="Layer_1">
          <g id="Union">
            <path d={svgPaths.p1c8bbc00} fill="var(--fill-0, #3C51B4)" />
            <path clipRule="evenodd" d={svgPaths.p29efd4b0} fill="var(--fill-0, #3C51B4)" fillRule="evenodd" />
            <path d={svgPaths.p2a8cbbe0} fill="var(--fill-0, #3C51B4)" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_73699">
            <rect fill="white" height="19" width="17" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SearchBullseyeIcon() {
  return (
    <div className="absolute inset-[0_-25%_-25%_0]" data-name="Search + bullseye icon">
      <Layer />
    </div>
  );
}

function SearchBullseyeIcon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Search + bullseye icon">
      <SearchBullseyeIcon />
    </div>
  );
}

function LabelContainer() {
  return (
    <div className="content-stretch flex items-center justify-center px-[2px] py-0 relative shrink-0" data-name="Label container">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[#3c51b4] text-[13px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Deep search
      </p>
    </div>
  );
}

function ButtonStandard() {
  return (
    <div className="bg-[#f0f3ff] content-stretch flex gap-[4px] items-center justify-center px-[12px] py-[8px] relative rounded-[9999px] shrink-0" data-name="Button / Standard">
      <SearchBullseyeIcon1 />
      <LabelContainer />
    </div>
  );
}

function SearchContainer() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 z-[2]" data-name="Search Container">
      <Form />
      <CopilotButton />
      <ButtonStandard />
    </div>
  );
}

function LabelContainer1() {
  return (
    <div className="content-stretch flex items-center justify-center px-[2px] py-0 relative shrink-0" data-name="Label container">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[#202020] text-[13px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Sign in
      </p>
    </div>
  );
}

function ButtonStandard1() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex gap-[4px] items-center justify-center px-[12px] py-[8px] relative rounded-[9999px] shrink-0" data-name="Button / Standard">
      <LabelContainer1 />
    </div>
  );
}

function HamburgerSpriteDesktopRewards() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Hamburger Sprite/Desktop/Rewards">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Hamburger Sprite/Desktop/Rewards">
          <path d={svgPaths.p1227b000} fill="var(--fill-0, #4F6BED)" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function IconContainer4() {
  return (
    <div className="content-stretch flex items-center justify-center pb-0 pt-[2px] px-0 relative shrink-0 size-[16px]" data-name="Icon Container">
      <HamburgerSpriteDesktopRewards />
    </div>
  );
}

function RewardsIcon() {
  return (
    <div className="content-stretch flex items-start p-[8px] relative rounded-[24px] shrink-0" data-name="Rewards Icon">
      <div aria-hidden="true" className="absolute border-2 border-[#4f6bed] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <IconContainer4 />
    </div>
  );
}

function RewardContainer() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Reward Container">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[14px] text-[rgba(0,0,0,0.75)] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        5
      </p>
      <RewardsIcon />
    </div>
  );
}

function HamburgerSpriteDesktopCollections() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Hamburger Sprite/Desktop/Collections">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_1_73648)" id="Hamburger Sprite/Desktop/Collections">
          <path d={svgPaths.p1d77f3f0} fill="var(--fill-0, black)" fillOpacity="0.6" id="Shape" />
        </g>
        <defs>
          <clipPath id="clip0_1_73648">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function LeftIcon() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Left Icon">
      <HamburgerSpriteDesktopCollections />
    </div>
  );
}

function TitleContainer() {
  return (
    <div className="basis-0 content-stretch flex gap-[2px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Title Container">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[22px] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.6)] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Collections
      </p>
    </div>
  );
}

function IconLabel() {
  return (
    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Icon + Label">
      <LeftIcon />
      <TitleContainer />
    </div>
  );
}

function ListItemRectangle() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[6px] items-end px-[16px] py-[8px] relative shrink-0 w-[325px]" data-name="List Item/Rectangle">
      <IconLabel />
    </div>
  );
}

function Default() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Default">
      <ListItemRectangle />
    </div>
  );
}

function Divider() {
  return (
    <div className="h-px max-h-px min-h-px relative shrink-0 w-full" data-name="Divider">
      <div className="absolute inset-[0_-0.15%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 326 1">
          <g id="Divider">
            <path d="M0.5 0.5H325.5" id="Line 1" stroke="var(--stroke-0, #DDDDDD)" strokeLinecap="round" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function HamburgerSpriteDesktopSetting() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Hamburger Sprite/Desktop/Setting">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_1_73714)" id="Hamburger Sprite/Desktop/Setting">
          <path d={svgPaths.p3c348700} fill="var(--fill-0, black)" fillOpacity="0.6" id="Shape" />
        </g>
        <defs>
          <clipPath id="clip0_1_73714">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function LeftIcon1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Left Icon">
      <HamburgerSpriteDesktopSetting />
    </div>
  );
}

function TitleContainer1() {
  return (
    <div className="basis-0 content-stretch flex gap-[2px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Title Container">
      <p className="basis-0 font-['Roboto:Regular',sans-serif] font-normal grow leading-[22px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.6)] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Setting
      </p>
    </div>
  );
}

function IconLabel1() {
  return (
    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Icon + Label">
      <LeftIcon1 />
      <TitleContainer1 />
    </div>
  );
}

function IconsChevronDown() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icons/Chevron-Down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_1_73720)" id="Icons/Chevron-Down">
          <path d={svgPaths.p35bd8d80} fill="var(--fill-0, black)" fillOpacity="0.6" id="Shape" />
        </g>
        <defs>
          <clipPath id="clip0_1_73720">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IconContainer5() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[14px]" data-name="Icon Container">
      <IconsChevronDown />
    </div>
  );
}

function ExpensionTitleContainer() {
  return (
    <div className="relative shrink-0 w-full" data-name="Expension Title Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[20px] items-center px-[16px] py-[8px] relative w-full">
          <IconLabel1 />
          <IconContainer5 />
        </div>
      </div>
    </div>
  );
}

function EntityAccordion() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Entity Accordion">
      <Divider />
      <ExpensionTitleContainer />
    </div>
  );
}

function Accordion() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Accordion">
      <EntityAccordion />
    </div>
  );
}

function HamburgerSpriteDesktopSafeSearch() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Hamburger Sprite/Desktop/SafeSearch">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Hamburger Sprite/Desktop/SafeSearch">
          <path d={svgPaths.p2cf02600} fill="var(--fill-0, black)" fillOpacity="0.6" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function LeftIcon2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Left Icon">
      <HamburgerSpriteDesktopSafeSearch />
    </div>
  );
}

function TitleContainer2() {
  return (
    <div className="basis-0 content-stretch flex gap-[2px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Title Container">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[22px] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.6)] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        SafeSearch
      </p>
    </div>
  );
}

function IconLabel2() {
  return (
    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Icon + Label">
      <LeftIcon2 />
      <TitleContainer2 />
    </div>
  );
}

function RightSideAction() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Right side Action">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[13px] text-[rgba(0,0,0,0.6)] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Moderate
      </p>
    </div>
  );
}

function ListItemRectangle1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[20px] items-end px-[16px] py-[8px] relative shrink-0 w-[325px]" data-name="List Item/Rectangle">
      <IconLabel2 />
      <RightSideAction />
    </div>
  );
}

function Default1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Default">
      <ListItemRectangle1 />
    </div>
  );
}

function HamburgerSpriteDesktopCopilot() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Hamburger Sprite/Desktop/Copilot">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Hamburger Sprite/Desktop/Copilot">
          <path clipRule="evenodd" d={svgPaths.p3ed9d00} fill="var(--fill-0, black)" fillOpacity="0.6" fillRule="evenodd" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function LeftIcon3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Left Icon">
      <HamburgerSpriteDesktopCopilot />
    </div>
  );
}

function TitleContainer3() {
  return (
    <div className="basis-0 content-stretch flex gap-[2px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Title Container">
      <p className="basis-0 font-['Roboto:Regular',sans-serif] font-normal grow leading-[22px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#111] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Copilot Settings
      </p>
    </div>
  );
}

function IconLabel3() {
  return (
    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Icon + Label">
      <LeftIcon3 />
      <TitleContainer3 />
    </div>
  );
}

function IconsChevronDown1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icons/Chevron-Down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_1_73720)" id="Icons/Chevron-Down">
          <path d={svgPaths.p35bd8d80} fill="var(--fill-0, black)" fillOpacity="0.6" id="Shape" />
        </g>
        <defs>
          <clipPath id="clip0_1_73720">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IconContainer6() {
  return (
    <div className="content-stretch flex items-center justify-center relative size-[14px]" data-name="Icon Container">
      <IconsChevronDown1 />
    </div>
  );
}

function ExpensionTitleContainer1() {
  return (
    <div className="bg-[#f9f9f9] relative shrink-0 w-full" data-name="Expension Title Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[20px] items-center px-[16px] py-[8px] relative w-full">
          <IconLabel3 />
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-[180deg]">
              <IconContainer6 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start justify-center leading-[20px] min-h-px min-w-px relative shrink-0 text-[13px] text-[rgba(0,0,0,0.6)]">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold relative shrink-0 text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Copilot response on result page
      </p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal min-w-full relative shrink-0 w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Choose if you want to see Copilot responses on the search result page.
      </p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pl-0 pr-[20px] py-0 relative w-full">
          <Frame12 />
        </div>
      </div>
    </div>
  );
}

function Toggle() {
  return (
    <div className="h-[16px] relative shrink-0 w-[36px]" data-name="Toggle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 16">
        <g id="Toggle">
          <rect fill="var(--fill-0, #106EBE)" height="16" id="Rectangle 1" rx="8" width="36" />
          <circle cx="28" cy="8" fill="var(--fill-0, #F9F9F9)" id="Ellipse 1" r="5" />
        </g>
      </svg>
    </div>
  );
}

function Toggle1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Toggle">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-[rgba(0,0,0,0.6)] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px]">On</p>
      </div>
      <Toggle />
    </div>
  );
}

function Frame16() {
  return (
    <div className="bg-[#f9f9f9] content-stretch flex flex-col gap-[10px] items-start p-[16px] relative rounded-[8px] shrink-0 w-[305px]">
      <Frame14 />
      <Toggle1 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start justify-center leading-[20px] min-h-px min-w-px relative shrink-0 text-[13px] text-[rgba(0,0,0,0.6)]">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold relative shrink-0 text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Scroll to open Copilot
      </p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal min-w-full relative shrink-0 w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Choose whether you would like Copilot to open when you scroll/swipe up at the top of the page.
      </p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pl-0 pr-[20px] py-0 relative w-full">
          <Frame13 />
        </div>
      </div>
    </div>
  );
}

function Toggle2() {
  return (
    <div className="h-[16px] relative shrink-0 w-[36px]" data-name="Toggle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 16">
        <g id="Toggle">
          <rect fill="var(--fill-0, #106EBE)" height="16" id="Rectangle 1" rx="8" width="36" />
          <circle cx="28" cy="8" fill="var(--fill-0, #F9F9F9)" id="Ellipse 1" r="5" />
        </g>
      </svg>
    </div>
  );
}

function Toggle3() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Toggle">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-[rgba(0,0,0,0.6)] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px]">On</p>
      </div>
      <Toggle2 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="bg-[#f9f9f9] content-stretch flex flex-col gap-[10px] items-start p-[16px] relative rounded-[8px] shrink-0 w-[305px]">
      <Frame17 />
      <Toggle3 />
    </div>
  );
}

function CopilotSettings() {
  return (
    <div className="relative shrink-0 w-full" data-name="Copilot Settings">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[10px] items-start p-[10px] relative w-full">
          <Frame16 />
          <Frame15 />
        </div>
      </div>
    </div>
  );
}

function ExpendModuleContainer() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="ExpendModuleContainer">
      <CopilotSettings />
    </div>
  );
}

function EntityAccordion1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[325px]" data-name="Entity Accordion">
      <ExpensionTitleContainer1 />
      <ExpendModuleContainer />
    </div>
  );
}

function Accordion1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Accordion">
      <EntityAccordion1 />
    </div>
  );
}

function HamburgerSpriteDesktopSearchHistory() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Hamburger Sprite/Desktop/Search History">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_1_73542)" id="Hamburger Sprite/Desktop/Search History">
          <path d={svgPaths.pddd5a00} fill="var(--fill-0, black)" fillOpacity="0.6" id="Shape" />
        </g>
        <defs>
          <clipPath id="clip0_1_73542">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function LeftIcon4() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Left Icon">
      <HamburgerSpriteDesktopSearchHistory />
    </div>
  );
}

function TitleContainer4() {
  return (
    <div className="basis-0 content-stretch flex gap-[2px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Title Container">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[22px] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.6)] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Search history
      </p>
    </div>
  );
}

function IconLabel4() {
  return (
    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Icon + Label">
      <LeftIcon4 />
      <TitleContainer4 />
    </div>
  );
}

function ListItemRectangle2() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[20px] items-end px-[16px] py-[8px] relative shrink-0 w-[325px]" data-name="List Item/Rectangle">
      <IconLabel4 />
    </div>
  );
}

function Default2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Default">
      <ListItemRectangle2 />
    </div>
  );
}

function HamburgerSpriteDesktopMyBing() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Hamburger Sprite/Desktop/MyBing">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_1_73642)" id="Hamburger Sprite/Desktop/MyBing">
          <path d={svgPaths.p14c76d00} fill="var(--fill-0, black)" fillOpacity="0.6" id="Shape" />
        </g>
        <defs>
          <clipPath id="clip0_1_73642">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function LeftIcon5() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Left Icon">
      <HamburgerSpriteDesktopMyBing />
    </div>
  );
}

function TitleContainer5() {
  return (
    <div className="basis-0 content-stretch flex gap-[2px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Title Container">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[22px] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.6)] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        My Bing
      </p>
    </div>
  );
}

function IconLabel5() {
  return (
    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Icon + Label">
      <LeftIcon5 />
      <TitleContainer5 />
    </div>
  );
}

function ListItemRectangle3() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[20px] items-end px-[16px] py-[8px] relative shrink-0 w-[325px]" data-name="List Item/Rectangle">
      <IconLabel5 />
    </div>
  );
}

function Default3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Default">
      <ListItemRectangle3 />
    </div>
  );
}

function HamburgerSpriteDesktopPrivacy() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Hamburger Sprite/Desktop/Privacy">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_1_73625)" id="Hamburger Sprite/Desktop/Privacy">
          <path d={svgPaths.p320def00} fill="var(--fill-0, black)" fillOpacity="0.6" id="Shape" />
        </g>
        <defs>
          <clipPath id="clip0_1_73625">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function LeftIcon6() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Left Icon">
      <HamburgerSpriteDesktopPrivacy />
    </div>
  );
}

function TitleContainer6() {
  return (
    <div className="basis-0 content-stretch flex gap-[2px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Title Container">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[22px] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.6)] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Privacy
      </p>
    </div>
  );
}

function IconLabel6() {
  return (
    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Icon + Label">
      <LeftIcon6 />
      <TitleContainer6 />
    </div>
  );
}

function ListItemRectangle4() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[20px] items-end px-[16px] py-[8px] relative shrink-0 w-[325px]" data-name="List Item/Rectangle">
      <IconLabel6 />
    </div>
  );
}

function Default4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Default">
      <ListItemRectangle4 />
    </div>
  );
}

function HamburgerSpriteDesktopPrivacy1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Hamburger Sprite/Desktop/Privacy">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_1_73625)" id="Hamburger Sprite/Desktop/Privacy">
          <path d={svgPaths.p320def00} fill="var(--fill-0, black)" fillOpacity="0.6" id="Shape" />
        </g>
        <defs>
          <clipPath id="clip0_1_73625">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function LeftIcon7() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Left Icon">
      <HamburgerSpriteDesktopPrivacy1 />
    </div>
  );
}

function TitleContainer7() {
  return (
    <div className="basis-0 content-stretch flex gap-[2px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Title Container">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[22px] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.6)] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Consumer Health Privacy
      </p>
    </div>
  );
}

function IconLabel7() {
  return (
    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Icon + Label">
      <LeftIcon7 />
      <TitleContainer7 />
    </div>
  );
}

function ListItemRectangle5() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[20px] items-end px-[16px] py-[8px] relative shrink-0 w-[325px]" data-name="List Item/Rectangle">
      <IconLabel7 />
    </div>
  );
}

function Default5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Default">
      <ListItemRectangle5 />
    </div>
  );
}

function HamburgerSpriteDesktopFeedback() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Hamburger Sprite/Desktop/Feedback">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_1_73420)" id="Hamburger Sprite/Desktop/Feedback">
          <path d={svgPaths.p8ad1f00} fill="var(--fill-0, black)" fillOpacity="0.6" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_73420">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function LeftIcon8() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Left Icon">
      <HamburgerSpriteDesktopFeedback />
    </div>
  );
}

function TitleContainer8() {
  return (
    <div className="basis-0 content-stretch flex gap-[2px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Title Container">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[22px] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.6)] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Feedback
      </p>
    </div>
  );
}

function IconLabel8() {
  return (
    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Icon + Label">
      <LeftIcon8 />
      <TitleContainer8 />
    </div>
  );
}

function ListItemRectangle6() {
  return (
    <div className="bg-[rgba(255,255,255,0)] relative shrink-0 w-full" data-name="List Item/Rectangle">
      <div className="flex flex-row items-end size-full">
        <div className="content-stretch flex gap-[20px] items-end px-[16px] py-[8px] relative w-full">
          <IconLabel8 />
        </div>
      </div>
    </div>
  );
}

function Default6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[325px]" data-name="Default">
      <ListItemRectangle6 />
    </div>
  );
}

function HamburgerSpriteDesktopDarkMode() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Hamburger Sprite/Desktop/Dark Mode">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_1_73645)" id="Hamburger Sprite/Desktop/Dark Mode">
          <path d={svgPaths.p12627df0} fill="var(--fill-0, black)" fillOpacity="0.6" id="Shape" />
        </g>
        <defs>
          <clipPath id="clip0_1_73645">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function LeftIcon9() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Left Icon">
      <HamburgerSpriteDesktopDarkMode />
    </div>
  );
}

function TitleContainer9() {
  return (
    <div className="basis-0 content-stretch flex gap-[2px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Title Container">
      <p className="basis-0 font-['Roboto:Regular',sans-serif] font-normal grow leading-[22px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.6)] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Appearance
      </p>
    </div>
  );
}

function IconLabel9() {
  return (
    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Icon + Label">
      <LeftIcon9 />
      <TitleContainer9 />
    </div>
  );
}

function IconsChevronDown2() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icons/Chevron-Down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_1_73720)" id="Icons/Chevron-Down">
          <path d={svgPaths.p35bd8d80} fill="var(--fill-0, black)" fillOpacity="0.6" id="Shape" />
        </g>
        <defs>
          <clipPath id="clip0_1_73720">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IconContainer7() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[14px]" data-name="Icon Container">
      <IconsChevronDown2 />
    </div>
  );
}

function ExpensionTitleContainer2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Expension Title Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[20px] items-center px-[16px] py-[8px] relative w-full">
          <IconLabel9 />
          <IconContainer7 />
        </div>
      </div>
    </div>
  );
}

function EntityAccordion2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Entity Accordion">
      <ExpensionTitleContainer2 />
    </div>
  );
}

function Accordion2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Accordion">
      <EntityAccordion2 />
    </div>
  );
}

function HamburgerSpriteDesktopThemes() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Hamburger Sprite/Desktop/Themes">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Hamburger Sprite/Desktop/Themes">
          <path d={svgPaths.pb71b800} fill="var(--fill-0, black)" fillOpacity="0.6" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function LeftIcon10() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Left Icon">
      <HamburgerSpriteDesktopThemes />
    </div>
  );
}

function TitleContainer10() {
  return (
    <div className="basis-0 content-stretch flex gap-[2px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Title Container">
      <p className="basis-0 font-['Roboto:Regular',sans-serif] font-normal grow leading-[22px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.6)] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Themes
      </p>
    </div>
  );
}

function IconLabel10() {
  return (
    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Icon + Label">
      <LeftIcon10 />
      <TitleContainer10 />
    </div>
  );
}

function IconsChevronDown3() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icons/Chevron-Down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_1_73720)" id="Icons/Chevron-Down">
          <path d={svgPaths.p35bd8d80} fill="var(--fill-0, black)" fillOpacity="0.6" id="Shape" />
        </g>
        <defs>
          <clipPath id="clip0_1_73720">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IconContainer8() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[14px]" data-name="Icon Container">
      <IconsChevronDown3 />
    </div>
  );
}

function ExpensionTitleContainer3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Expension Title Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[20px] items-center px-[16px] py-[8px] relative w-full">
          <IconLabel10 />
          <IconContainer8 />
        </div>
      </div>
    </div>
  );
}

function EntityAccordion3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Entity Accordion">
      <ExpensionTitleContainer3 />
    </div>
  );
}

function Accordion3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[325px]" data-name="Accordion">
      <EntityAccordion3 />
    </div>
  );
}

function MenuContent() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Menu Content">
      <Default />
      <Accordion />
      <Default1 />
      <Accordion1 />
      <Default2 />
      <Default3 />
      <Default4 />
      <Default5 />
      <Default6 />
      <Accordion2 />
      <Accordion3 />
    </div>
  );
}

function DropdownContent() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip px-0 py-[12px] relative rounded-[6px] shadow-[0px_2px_4px_1px_rgba(0,0,0,0.18),0px_0px_0px_1px_rgba(0,0,0,0.05)] shrink-0" data-name="Dropdown Content">
      <MenuContent />
    </div>
  );
}

function DropdownComponent() {
  return (
    <div className="absolute h-px opacity-0 right-0 shadow-[0px_2px_4px_1px_rgba(0,0,0,0.18),0px_0px_0px_1px_rgba(0,0,0,0.05)] top-0" data-name="Dropdown Component">
      <div className="size-full">
        <div className="content-stretch flex flex-col h-full items-start pb-0 pt-[10px] px-0 relative">
          <DropdownContent />
        </div>
      </div>
    </div>
  );
}

function IconsHamburger() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icons/Hamburger">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icons/Hamburger">
          <g id="Shape">
            <path d={svgPaths.p1be66400} fill="var(--fill-0, black)" fillOpacity="0.6" />
            <path d={svgPaths.p18b26000} fill="var(--fill-0, black)" fillOpacity="0.6" />
            <path d={svgPaths.p183ee1c0} fill="var(--fill-0, black)" fillOpacity="0.6" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[24px]" data-name="Icon">
      <IconsHamburger />
    </div>
  );
}

function Trigger() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Trigger">
      <Icon />
    </div>
  );
}

function TriggerContainer() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Trigger Container">
      <Trigger />
    </div>
  );
}

function Dropdown() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Dropdown">
      <DropdownComponent />
      <TriggerContainer />
    </div>
  );
}

function IdControlGroup() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0" data-name="ID Control Group">
      <ButtonStandard1 />
      <RewardContainer />
      <Dropdown />
    </div>
  );
}

function IdContainer() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-[32px] items-end justify-center min-h-px min-w-px relative shrink-0 z-[1]" data-name="ID Container">
      <IdControlGroup />
    </div>
  );
}

function HeaderTop() {
  return (
    <div className="relative shrink-0 w-full z-[2]" data-name="Header Top">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] isolate items-center pl-0 pr-[56px] py-[4px] relative w-full">
          <SearchContainer />
          <IdContainer />
        </div>
      </div>
    </div>
  );
}

function IconsSpyglass() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icons/Spyglass">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_73533)" id="Icons/Spyglass">
          <path clipRule="evenodd" d={svgPaths.p37ec8700} fill="var(--fill-0, #4F6BED)" fillRule="evenodd" id="Shape" />
        </g>
        <defs>
          <clipPath id="clip0_1_73533">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IconContainer9() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[16px]" data-name="Icon Container">
      <IconsSpyglass />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center p-[8px] relative shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#4f6bed] border-[0px_0px_3px] border-solid inset-0 pointer-events-none" />
      <IconContainer9 />
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[30px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#4f6bed] text-[11px] text-center text-nowrap uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
        All
      </p>
    </div>
  );
}

function HeaderTabButton() {
  return (
    <div className="content-stretch flex items-center justify-center max-w-[234px] px-[12px] py-0 relative shrink-0" data-name="Header Tab Button">
      <Container />
    </div>
  );
}

function IconsSpyglass1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icons/Spyglass">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_73530)" id="Icons/Spyglass">
          <path clipRule="evenodd" d={svgPaths.p37ec8700} fill="var(--fill-0, #767676)" fillRule="evenodd" id="Shape" />
        </g>
        <defs>
          <clipPath id="clip0_1_73530">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IconContainer10() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[16px]" data-name="Icon Container">
      <IconsSpyglass1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center p-[8px] relative shrink-0" data-name="Container">
      <IconContainer10 />
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[30px] overflow-ellipsis overflow-hidden relative shrink-0 text-[11px] text-[rgba(0,0,0,0.75)] text-center text-nowrap uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
        Search
      </p>
    </div>
  );
}

function HeaderTabButton1() {
  return (
    <div className="content-stretch flex items-center justify-center max-w-[234px] px-[12px] py-0 relative shrink-0" data-name="Header Tab Button">
      <Container1 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center p-[8px] relative shrink-0" data-name="Container">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[30px] overflow-ellipsis overflow-hidden relative shrink-0 text-[11px] text-[rgba(0,0,0,0.75)] text-center text-nowrap uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
        Images
      </p>
    </div>
  );
}

function HeaderTabButton2() {
  return (
    <div className="content-stretch flex items-center justify-center max-w-[234px] px-[12px] py-0 relative shrink-0" data-name="Header Tab Button">
      <Container2 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center p-[8px] relative shrink-0" data-name="Container">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[30px] overflow-ellipsis overflow-hidden relative shrink-0 text-[11px] text-[rgba(0,0,0,0.75)] text-center text-nowrap uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
        VideoS
      </p>
    </div>
  );
}

function HeaderTabButton3() {
  return (
    <div className="content-stretch flex items-center justify-center max-w-[234px] px-[12px] py-0 relative shrink-0" data-name="Header Tab Button">
      <Container3 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center p-[8px] relative shrink-0" data-name="Container">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[30px] overflow-ellipsis overflow-hidden relative shrink-0 text-[11px] text-[rgba(0,0,0,0.75)] text-center text-nowrap uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
        Maps
      </p>
    </div>
  );
}

function HeaderTabButton4() {
  return (
    <div className="content-stretch flex items-center justify-center max-w-[234px] px-[12px] py-0 relative shrink-0" data-name="Header Tab Button">
      <Container4 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center p-[8px] relative shrink-0" data-name="Container">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[30px] overflow-ellipsis overflow-hidden relative shrink-0 text-[11px] text-[rgba(0,0,0,0.75)] text-center text-nowrap uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
        News
      </p>
    </div>
  );
}

function HeaderTabButton5() {
  return (
    <div className="content-stretch flex items-center justify-center max-w-[234px] px-[12px] py-0 relative shrink-0" data-name="Header Tab Button">
      <Container5 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center p-[8px] relative shrink-0" data-name="Container">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[30px] overflow-ellipsis overflow-hidden relative shrink-0 text-[11px] text-[rgba(0,0,0,0.75)] text-center text-nowrap uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
        Shopping
      </p>
    </div>
  );
}

function HeaderTabButton6() {
  return (
    <div className="content-stretch flex items-center justify-center max-w-[234px] px-[12px] py-0 relative shrink-0" data-name="Header Tab Button">
      <Container6 />
    </div>
  );
}

function TitleContainer11() {
  return (
    <div className="basis-0 content-stretch flex gap-[2px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Title Container">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[22px] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.75)] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        SHOPPING
      </p>
    </div>
  );
}

function IconLabel11() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Icon + Label">
      <TitleContainer11 />
    </div>
  );
}

function ListItemRectangle7() {
  return (
    <div className="bg-white content-stretch flex gap-[6px] items-end px-[16px] py-[8px] relative shrink-0 w-[160px]" data-name="List Item/Rectangle">
      <IconLabel11 />
    </div>
  );
}

function ListItem() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="List item 1">
      <ListItemRectangle7 />
    </div>
  );
}

function TitleContainer12() {
  return (
    <div className="basis-0 content-stretch flex gap-[2px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Title Container">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[22px] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.75)] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        FLIGHTS
      </p>
    </div>
  );
}

function IconLabel12() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Icon + Label">
      <TitleContainer12 />
    </div>
  );
}

function ListItemRectangle8() {
  return (
    <div className="bg-white content-stretch flex gap-[6px] items-end px-[16px] py-[8px] relative shrink-0 w-[160px]" data-name="List Item/Rectangle">
      <IconLabel12 />
    </div>
  );
}

function ListItem1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="List item 2">
      <ListItemRectangle8 />
    </div>
  );
}

function TitleContainer13() {
  return (
    <div className="basis-0 content-stretch flex gap-[2px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Title Container">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[22px] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.75)] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        HOTELS
      </p>
    </div>
  );
}

function IconLabel13() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Icon + Label">
      <TitleContainer13 />
    </div>
  );
}

function ListItemRectangle9() {
  return (
    <div className="bg-white content-stretch flex gap-[6px] items-end px-[16px] py-[8px] relative shrink-0 w-[160px]" data-name="List Item/Rectangle">
      <IconLabel13 />
    </div>
  );
}

function ListItem2() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="List item 3">
      <ListItemRectangle9 />
    </div>
  );
}

function TitleContainer14() {
  return (
    <div className="basis-0 content-stretch flex gap-[2px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Title Container">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[22px] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.75)] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        REAL ESTATE
      </p>
    </div>
  );
}

function IconLabel14() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Icon + Label">
      <TitleContainer14 />
    </div>
  );
}

function ListItemRectangle10() {
  return (
    <div className="bg-white content-stretch flex gap-[6px] items-end px-[16px] py-[8px] relative shrink-0 w-[160px]" data-name="List Item/Rectangle">
      <IconLabel14 />
    </div>
  );
}

function ListItem3() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="List item 4">
      <ListItemRectangle10 />
    </div>
  );
}

function TitleContainer15() {
  return (
    <div className="basis-0 content-stretch flex gap-[2px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Title Container">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[22px] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.75)] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        MY BING
      </p>
    </div>
  );
}

function IconLabel15() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Icon + Label">
      <TitleContainer15 />
    </div>
  );
}

function ListItemRectangle11() {
  return (
    <div className="bg-white content-stretch flex gap-[6px] items-end px-[16px] py-[8px] relative shrink-0 w-[160px]" data-name="List Item/Rectangle">
      <IconLabel15 />
    </div>
  );
}

function ListItem4() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="List item 5">
      <ListItemRectangle11 />
    </div>
  );
}

function ListContainer() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[160px]" data-name="List Container">
      <ListItem />
      <ListItem1 />
      <ListItem2 />
      <ListItem3 />
      <ListItem4 />
    </div>
  );
}

function ScopesMore() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Scopes More">
      <ListContainer />
    </div>
  );
}

function DropdownContent1() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip pb-[8px] pt-0 px-0 relative rounded-[6px] shadow-[0px_2px_4px_1px_rgba(0,0,0,0.18),0px_0px_0px_1px_rgba(0,0,0,0.05)] shrink-0" data-name="Dropdown Content">
      <ScopesMore />
    </div>
  );
}

function DropdownComponent1() {
  return (
    <div className="absolute h-px left-0 opacity-0 shadow-[0px_2px_4px_1px_rgba(0,0,0,0.18),0px_0px_0px_1px_rgba(0,0,0,0.05)] top-0" data-name="Dropdown Component">
      <div className="size-full">
        <div className="content-stretch flex flex-col h-full items-start pb-0 pl-[20px] pr-0 pt-[20px] relative">
          <DropdownContent1 />
        </div>
      </div>
    </div>
  );
}

function IconsMore() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icons/More">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icons/More">
          <path d={svgPaths.p3d628b00} fill="var(--fill-0, black)" fillOpacity="0.75" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function IconContainer11() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[16px]" data-name="Icon Container">
      <IconsMore />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center p-[8px] relative shrink-0" data-name="Container">
      <IconContainer11 />
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[30px] overflow-ellipsis overflow-hidden relative shrink-0 text-[11px] text-[rgba(0,0,0,0.75)] text-center text-nowrap uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
        MORE
      </p>
    </div>
  );
}

function Trigger1() {
  return (
    <div className="content-stretch flex items-center justify-center max-w-[234px] px-[12px] py-0 relative shrink-0" data-name="Trigger">
      <Container7 />
    </div>
  );
}

function TriggerContainer1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Trigger Container">
      <Trigger1 />
    </div>
  );
}

function Dropdown1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Dropdown">
      <DropdownComponent1 />
      <TriggerContainer1 />
    </div>
  );
}

function More() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="More">
      <Dropdown1 />
    </div>
  );
}

function More1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="More">
      <More />
    </div>
  );
}

function Fade() {
  return <div className="absolute bottom-0 opacity-0 right-0 top-0 w-[20px]" data-name="fade" style={{ backgroundImage: "linear-gradient(-90deg, rgb(245, 245, 245) 0%, rgba(245, 245, 245, 0) 100%)" }} />;
}

function Scopes() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Scopes">
      <HeaderTabButton />
      <HeaderTabButton1 />
      <HeaderTabButton2 />
      <HeaderTabButton3 />
      <HeaderTabButton4 />
      <HeaderTabButton5 />
      <HeaderTabButton6 />
      <More1 />
      <Fade />
    </div>
  );
}

function HeaderTabBarContainer() {
  return (
    <div className="relative shrink-0 w-full z-[1]" data-name="Header Tab Bar Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-end size-full">
        <div className="content-stretch flex flex-col items-start justify-end pb-0 pl-[160px] pr-0 pt-[6px] relative w-full">
          <Scopes />
        </div>
      </div>
    </div>
  );
}

function HeaderContainer() {
  return (
    <div className="content-stretch flex flex-col isolate items-start relative shrink-0 w-full" data-name="Header container">
      <HeaderTop />
      <HeaderTabBarContainer />
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start pb-0 pt-[18px] px-0 relative shrink-0 w-full z-[5]" data-name="Header">
      <HeaderContainer />
    </div>
  );
}

function CopilotSearchLogo() {
  return (
    <div className="h-[16px] relative shrink-0 w-[134px]" data-name="Copilot Search logo">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 134 16">
        <g id="Copilot Search logo">
          <g id="Group">
            <path d={svgPaths.p35379f00} fill="url(#paint0_radial_1_73509)" id="Vector" />
            <path d={svgPaths.p11d03080} fill="url(#paint1_radial_1_73509)" id="Vector_2" />
            <path d={svgPaths.p31598f00} fill="url(#paint2_linear_1_73509)" id="Vector_3" />
            <path d={svgPaths.p31598f00} fill="url(#paint3_linear_1_73509)" id="Vector_4" />
            <path d={svgPaths.p15cbfb00} fill="url(#paint4_radial_1_73509)" id="Vector_5" />
            <path d={svgPaths.p15cbfb00} fill="url(#paint5_linear_1_73509)" id="Vector_6" />
          </g>
          <g id="Vector_7">
            <path d={svgPaths.p1ed17800} fill="var(--fill-0, black)" fillOpacity="0.75" />
            <path d={svgPaths.p3af3500} fill="var(--fill-0, black)" fillOpacity="0.75" />
            <path d={svgPaths.p2b026c00} fill="var(--fill-0, black)" fillOpacity="0.75" />
            <path d={svgPaths.p20a9a800} fill="var(--fill-0, black)" fillOpacity="0.75" />
            <path d={svgPaths.pedd80c0} fill="var(--fill-0, black)" fillOpacity="0.75" />
            <path d={svgPaths.p1e235200} fill="var(--fill-0, black)" fillOpacity="0.75" />
            <path d={svgPaths.p392b2880} fill="var(--fill-0, black)" fillOpacity="0.75" />
          </g>
          <g id="Vector_8">
            <path d={svgPaths.p18f4c780} fill="var(--fill-0, black)" fillOpacity="0.75" />
            <path d={svgPaths.p34539f00} fill="var(--fill-0, black)" fillOpacity="0.75" />
            <path d={svgPaths.p2aca6300} fill="var(--fill-0, black)" fillOpacity="0.75" />
            <path d={svgPaths.p16e50b00} fill="var(--fill-0, black)" fillOpacity="0.75" />
            <path d={svgPaths.p3af95e00} fill="var(--fill-0, black)" fillOpacity="0.75" />
            <path d={svgPaths.p2810c600} fill="var(--fill-0, black)" fillOpacity="0.75" />
          </g>
        </g>
        <defs>
          <radialGradient cx="0" cy="0" gradientTransform="matrix(-3.9733 -4.85751 -4.56328 3.74003 13.2815 5.31134)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_73509" r="1">
            <stop offset="0.1" stopColor="#00AEFF" />
            <stop offset="0.77" stopColor="#2253CE" />
            <stop offset="1" stopColor="#0736C4" />
          </radialGradient>
          <radialGradient cx="0" cy="0" gradientTransform="matrix(3.5819 4.56121 4.42057 -3.47834 2.46655 10.5601)" gradientUnits="userSpaceOnUse" id="paint1_radial_1_73509" r="1">
            <stop stopColor="#FFB657" />
            <stop offset="0.63" stopColor="#FF5F3D" />
            <stop offset="0.92" stopColor="#C02B3C" />
          </radialGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_1_73509" x1="4.70384" x2="5.53158" y1="1.187" y2="10.7613">
            <stop offset="0.16" stopColor="#0D91E1" />
            <stop offset="0.49" stopColor="#52B471" />
            <stop offset="0.65" stopColor="#98BD42" />
            <stop offset="0.94" stopColor="#FFC800" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint3_linear_1_73509" x1="4.78598" x2="5.23816" y1="-0.0113407" y2="10.4325">
            <stop stopColor="#3DCBFF" />
            <stop offset="0.25" stopColor="#0588F7" stopOpacity="0" />
          </linearGradient>
          <radialGradient cx="0" cy="0" gradientTransform="matrix(-4.59431 13.147 15.7366 5.51015 14.3695 3.99529)" gradientUnits="userSpaceOnUse" id="paint4_radial_1_73509" r="1">
            <stop offset="0.07" stopColor="#8C48FF" />
            <stop offset="0.5" stopColor="#F2598A" />
            <stop offset="0.9" stopColor="#FFB152" />
          </radialGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint5_linear_1_73509" x1="10.9429" x2="10.9362" y1="3.37165" y2="6.21723">
            <stop offset="0.06" stopColor="#F8ADFA" />
            <stop offset="0.71" stopColor="#A86EDD" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Title">
      <CopilotSearchLogo />
    </div>
  );
}

function TabTitle() {
  return (
    <div className="content-stretch flex items-center max-w-[380px] pl-0 pr-[16px] py-0 relative shrink-0" data-name="Tab Title">
      <Title />
    </div>
  );
}

function Frame4() {
  return (
    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0">
      <TabTitle />
    </div>
  );
}

function TitleHead() {
  return (
    <div className="content-stretch flex items-center pl-[20px] pr-0 py-0 relative shrink-0 w-[1208px]" data-name="Title head">
      <Frame4 />
    </div>
  );
}

function HoverControlCardBackground() {
  return <div className="basis-0 grow min-h-px min-w-px shrink-0 w-full" data-name="Hover control/Card Background" />;
}

function CardBackground() {
  return (
    <div className="absolute inset-[0_-6.42%] rounded-[16px]" data-name="Card Background">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <HoverControlCardBackground />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Image() {
  return (
    <div className="h-full relative shrink-0 w-[224px]" data-name="image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
    </div>
  );
}

function Image1() {
  return (
    <div className="h-full relative shrink-0 w-[245px]" data-name="image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage1} />
    </div>
  );
}

function Component() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="4*4">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img44} />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function Image2() {
  return (
    <div className="h-full relative shrink-0 w-[180px]" data-name="image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage2} />
    </div>
  );
}

function Frame21() {
  return (
    <div className="basis-0 content-stretch flex gap-[2px] grow items-center min-h-px min-w-px relative shrink-0 w-full">
      <Image />
      <Image1 />
      <Component />
      <Image2 />
    </div>
  );
}

function Image3() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage3} />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function Image4() {
  return (
    <div className="h-full relative shrink-0 w-[195px]" data-name="image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage4} />
    </div>
  );
}

function Image5() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage5} />
    </div>
  );
}

function LabelContainer2() {
  return (
    <div className="content-stretch flex items-center justify-center px-[2px] py-0 relative shrink-0" data-name="Label container">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[26px] relative shrink-0 text-[16px] text-nowrap text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
        See more
      </p>
    </div>
  );
}

function RightIcon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Right Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Right Icon">
          <path d={svgPaths.p267c6e00} fill="var(--fill-0, white)" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <LabelContainer2 />
      <RightIcon />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.75)] content-stretch flex gap-[4px] h-[211px] items-center justify-center left-0 px-[12px] py-[8px] top-0 w-[261px]" data-name="Button">
      <Frame23 />
    </div>
  );
}

function Image6() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-full items-start min-h-px min-w-px overflow-clip relative shrink-0" data-name="image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage6} />
      <Button />
    </div>
  );
}

function Frame22() {
  return (
    <div className="basis-0 content-stretch flex gap-[2px] grow items-center min-h-px min-w-px relative shrink-0 w-full">
      <Image3 />
      <Image4 />
      <Image5 />
      <Image6 />
    </div>
  );
}

function Component6X() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start min-h-px min-w-px overflow-clip relative rounded-[16px] shrink-0 w-full" data-name="6x4">
      <Frame21 />
      <Frame22 />
    </div>
  );
}

function CardContainer() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-[424px] items-start min-h-px min-w-px relative shrink-0" data-name="Card container">
      <CardBackground />
      <Component6X />
    </div>
  );
}

function HoverControlCardBackground1() {
  return <div className="basis-0 bg-[#f0f3ff] grow min-h-px min-w-px shrink-0 w-full" data-name="Hover control/Card Background" />;
}

function CardBackground1() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-start overflow-clip rounded-[16px]" data-name="Card Background">
      <HoverControlCardBackground1 />
    </div>
  );
}

function Chevron() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Chevron">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Chevron">
          <path d={svgPaths.p20d71070} fill="var(--fill-0, black)" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function ButtonTitleAction() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[24px]" data-name="Button / Title action">
      <Chevron />
    </div>
  );
}

function Title1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center relative shrink-0 w-full" data-name="Title">
      <p className="basis-0 font-['Roboto:Bold',sans-serif] font-bold grow leading-[22px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-black text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Related search
      </p>
      <ButtonTitleAction />
    </div>
  );
}

function Group() {
  return (
    <div className="basis-0 grid-cols-[max-content] grid-rows-[max-content] grow inline-grid leading-[0] min-h-px min-w-px place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] font-['Roboto:Bold',sans-serif] font-bold leading-[20px] ml-0 mt-0 relative text-[0px] text-[13px] text-black w-[104px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="mb-0" style={{ fontVariationSettings: "'wdth' 100" }}>
          Beautiful
        </p>
        <p className="font-['Roboto:Regular',sans-serif] font-normal" style={{ fontVariationSettings: "'wdth' 100" }}>
          Paris
        </p>
      </div>
    </div>
  );
}

function RsTopic() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="RS topic">
      <div className="relative rounded-[8px] shrink-0 size-[48px]" data-name="Thumbnail">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[8px] size-full" src={imgImage2} />
      </div>
      <Group />
    </div>
  );
}

function Group1() {
  return (
    <div className="basis-0 grid-cols-[max-content] grid-rows-[max-content] grow inline-grid leading-[0] min-h-px min-w-px place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] font-['Roboto:Bold',sans-serif] font-bold leading-[20px] ml-0 mt-0 relative text-[0px] text-[13px] text-black w-[104px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="mb-0" style={{ fontVariationSettings: "'wdth' 100" }}>{`Louvre `}</p>
        <p className="font-['Roboto:Regular',sans-serif] font-normal" style={{ fontVariationSettings: "'wdth' 100" }}>
          Paris
        </p>
      </div>
    </div>
  );
}

function RsTopic1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="RS topic">
      <div className="relative rounded-[8px] shrink-0 size-[48px]" data-name="image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[8px] size-full" src={imgImage7} />
      </div>
      <Group1 />
    </div>
  );
}

function Group2() {
  return (
    <div className="basis-0 grid-cols-[max-content] grid-rows-[max-content] grow inline-grid leading-[0] min-h-px min-w-px place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] font-['Roboto:Bold',sans-serif] font-bold leading-[20px] ml-0 mt-0 relative text-[0px] text-[13px] text-black w-[104px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="mb-0" style={{ fontVariationSettings: "'wdth' 100" }}>{`Where to Stay `}</p>
        <p className="font-['Roboto:Regular',sans-serif] font-normal" style={{ fontVariationSettings: "'wdth' 100" }}>
          in Paris
        </p>
      </div>
    </div>
  );
}

function RsTopic2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="RS topic">
      <div className="relative rounded-[8px] shrink-0 size-[48px]" data-name="image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[8px] size-full" src={imgImage1} />
      </div>
      <Group2 />
    </div>
  );
}

function Group3() {
  return (
    <div className="basis-0 grid-cols-[max-content] grid-rows-[max-content] grow inline-grid leading-[0] min-h-px min-w-px place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] font-['Roboto:Bold',sans-serif] font-bold leading-[20px] ml-0 mt-0 relative text-[0px] text-[13px] text-black w-[104px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="font-['Roboto:Regular',sans-serif] font-normal mb-0" style={{ fontVariationSettings: "'wdth' 100" }}>{`Paris `}</p>
        <p style={{ fontVariationSettings: "'wdth' 100" }}>Postcard</p>
      </div>
    </div>
  );
}

function RsTopic3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="RS topic">
      <div className="relative rounded-[8px] shrink-0 size-[48px]" data-name="image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[8px] size-full" src={img44} />
      </div>
      <Group3 />
    </div>
  );
}

function Group4() {
  return (
    <div className="basis-0 grid-cols-[max-content] grid-rows-[max-content] grow inline-grid leading-[0] min-h-px min-w-px place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] font-['Roboto:Bold',sans-serif] font-bold leading-[20px] ml-0 mt-0 relative text-[0px] text-[13px] text-black w-[104px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="font-['Roboto:Regular',sans-serif] font-normal mb-0" style={{ fontVariationSettings: "'wdth' 100" }}>
          Paris
        </p>
        <p style={{ fontVariationSettings: "'wdth' 100" }}>Artwork</p>
      </div>
    </div>
  );
}

function RsTopic4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="RS topic">
      <div className="relative rounded-[8px] shrink-0 size-[48px]" data-name="image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[8px] size-full" src={imgImage3} />
      </div>
      <Group4 />
    </div>
  );
}

function Group5() {
  return (
    <div className="basis-0 grid-cols-[max-content] grid-rows-[max-content] grow inline-grid leading-[0] min-h-px min-w-px place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] font-['Roboto:Bold',sans-serif] font-bold leading-[20px] ml-0 mt-0 relative text-[0px] text-[13px] text-black w-[104px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="mb-0" style={{ fontVariationSettings: "'wdth' 100" }}>{`Paris `}</p>
        <p className="font-['Roboto:Regular',sans-serif] font-normal" style={{ fontVariationSettings: "'wdth' 100" }}>
          Sightseeing
        </p>
      </div>
    </div>
  );
}

function RsTopic5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="RS topic">
      <div className="relative rounded-[8px] shrink-0 size-[48px]" data-name="image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[8px] size-full" src={imgImage5} />
      </div>
      <Group5 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[12px] grow items-center min-h-px min-w-px overflow-x-auto overflow-y-clip relative shrink-0 w-full">
      <RsTopic />
      <RsTopic1 />
      <RsTopic2 />
      <RsTopic3 />
      <RsTopic4 />
      <RsTopic5 />
    </div>
  );
}

function RsThumbnail() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="RS/thumbnail">
      <Title1 />
      <Frame18 />
    </div>
  );
}

function CardContainer1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Card container">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start p-[20px] relative size-full">
          <CardBackground1 />
          <RsThumbnail />
        </div>
      </div>
    </div>
  );
}

function AnswerCard() {
  return (
    <div className="content-stretch flex flex-col h-[424px] items-start overflow-clip relative shrink-0 w-[200px]" data-name="Answer card">
      <CardContainer1 />
    </div>
  );
}

function AnswerCard1() {
  return (
    <div className="content-stretch flex gap-[24px] items-start overflow-clip relative shrink-0 w-[1208px]" data-name="Answer Card">
      <CardContainer />
      <AnswerCard />
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0">
      <TitleHead />
      <AnswerCard1 />
    </div>
  );
}

function ButtonContainer() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Button container">
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
          <div className="absolute inset-[-0.5px_-0.08%]" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 605 1">
              <path d="M0.5 0.5H604.5" id="Line 1" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.1" />
            </svg>
          </div>
        </div>
      </div>
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
          <div className="absolute inset-[-0.5px_-0.08%]" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 605 1">
              <path d={svgPaths.p1e329e80} fill="var(--stroke-0, black)" fillOpacity="0.1" id="Line 1" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-[1208px]" data-name="Footer">
      <ButtonContainer />
    </div>
  );
}

function PoleCarouselPortraits() {
  return (
    <div className="relative shrink-0 w-full z-[4]" data-name="Pole Carousel/Portraits">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start pb-0 pl-[160px] pr-0 pt-[20px] relative w-full">
          <Frame24 />
          <Footer />
        </div>
      </div>
    </div>
  );
}

function Placeholder() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px overflow-clip relative rounded-[2px] shrink-0" data-name="Placeholder">
      <div className="absolute bg-[#ccc] inset-0" data-name="image" />
    </div>
  );
}

function AvatarFavContainer() {
  return (
    <div className="bg-[#f5f5f5] relative rounded-[9999px] shrink-0 size-[26px]" data-name="Avatar & Fav Container">
      <div className="content-stretch flex items-center justify-center overflow-clip p-[6px] relative rounded-[inherit] size-full">
        <Placeholder />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ececec] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function Url() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="url">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#111] text-[13px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        www.algoloremipsum-attribution.com
      </p>
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Link">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#4007a2] text-[13px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Cached
      </p>
    </div>
  );
}

function UrlDropdown() {
  return (
    <div className="content-stretch flex flex-col items-start p-[10px] relative shrink-0" data-name="url dropdown">
      <Link />
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#666] text-[13px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        AI-generated caption
      </p>
    </div>
  );
}

function DropdownContent2() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative rounded-[6px] shadow-[0px_2px_4px_1px_rgba(0,0,0,0.18),0px_0px_0px_1px_rgba(0,0,0,0.05)] shrink-0" data-name="Dropdown Content">
      <UrlDropdown />
    </div>
  );
}

function DropdownComponent2() {
  return (
    <div className="absolute h-px opacity-0 right-0 shadow-[0px_2px_4px_1px_rgba(0,0,0,0.18),0px_0px_0px_1px_rgba(0,0,0,0.05)] top-0" data-name="Dropdown Component">
      <div className="size-full">
        <div className="content-stretch flex flex-col h-full items-start pb-0 pt-[20px] px-0 relative">
          <DropdownContent2 />
        </div>
      </div>
    </div>
  );
}

function IconsCaretDown() {
  return (
    <div className="relative shrink-0 size-[8px]" data-name="Icons/Caret Down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
        <g id="Icons/Caret Down">
          <path d={svgPaths.p50f600} fill="var(--fill-0, #767676)" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function IconContainer12() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Icon Container">
      <IconsCaretDown />
    </div>
  );
}

function Trigger2() {
  return (
    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-px min-w-px relative shrink-0 w-full" data-name="Trigger">
      <IconContainer12 />
    </div>
  );
}

function TriggerContainer2() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px relative shrink-0 w-full" data-name="Trigger Container">
      <Trigger2 />
    </div>
  );
}

function Dropdown2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-full items-start justify-center relative shrink-0 w-[16px]" data-name="Dropdown">
      <DropdownComponent2 />
      <TriggerContainer2 />
    </div>
  );
}

function AlgoAttribution() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Algo Attribution">
      <Url />
      <div className="flex flex-row items-center self-stretch">
        <Dropdown2 />
      </div>
    </div>
  );
}

function TextAttribution() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="Text attribution">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#111] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Site name lorem ipsum
      </p>
      <AlgoAttribution />
    </div>
  );
}

function ResultTop() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Result Top">
      <AvatarFavContainer />
      <TextAttribution />
    </div>
  );
}

function AlgoHeader() {
  return (
    <div className="content-stretch flex items-start max-w-[608px] relative shrink-0 w-full z-[4]" data-name="Algo Header">
      <ResultTop />
    </div>
  );
}

function Link1() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="Link">
      <p className="basis-0 font-['Roboto:Regular',sans-serif] font-normal grow leading-[24px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#4007a2] text-[20px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>{`Title Lorem Ipsum Dolor Consectatur `}</p>
    </div>
  );
}

function TitleAlgoTitle() {
  return (
    <div className="max-w-[608px] relative shrink-0 w-full" data-name="Title/Algo Title">
      <div className="max-w-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-start max-w-[inherit] pl-0 pr-[10px] py-0 relative w-full">
          <Link1 />
        </div>
      </div>
    </div>
  );
}

function BaseBadge() {
  return (
    <div className="bg-white content-stretch flex gap-[6px] items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="Base Badge">
      <div aria-hidden="true" className="absolute border border-[#ddd] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[12px] relative shrink-0 text-[#666] text-[11px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Web
      </p>
    </div>
  );
}

function WebsiteTypeBadge() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Website Type Badge">
      <BaseBadge />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex font-['Roboto:Regular',sans-serif] font-normal gap-[4px] items-center leading-[22px] relative shrink-0 text-[#666] text-[14px] text-nowrap">
      <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        Oct 26, 2018
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        ·
      </p>
    </div>
  );
}

function Date() {
  return (
    <div className="absolute content-stretch flex gap-[4px] items-center left-0 pl-0 pr-[4px] py-0 top-0" data-name="Date">
      <WebsiteTypeBadge />
      <Frame2 />
    </div>
  );
}

function TextContent() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Text Content">
      <p className="-webkit-box [text-indent:122px] font-['Roboto:Regular',sans-serif] font-normal leading-[22px] min-w-full overflow-ellipsis overflow-hidden relative shrink-0 text-[#666] text-[14px] w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Snippet Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ipsum nostrud exercitation ullamco laboris sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Snippet Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt. Snippet Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. `}</p>
      <Date />
    </div>
  );
}

function SnippetContainer() {
  return (
    <div className="content-stretch flex gap-[10px] items-start relative shrink-0 w-full" data-name="Snippet Container">
      <TextContent />
    </div>
  );
}

function Body1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Body 1">
      <SnippetContainer />
    </div>
  );
}

function Attachment() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[608px] relative shrink-0 w-[648px]" data-name="Attachment 1">
      <Body1 />
    </div>
  );
}

function IconsChevronLeft() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icons/Chevron-Left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icons/Chevron-Left">
          <path d={svgPaths.p3fbb7800} fill="var(--fill-0, #CCCCCC)" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function IconContainer13() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[16px]" data-name="Icon Container">
      <IconsChevronLeft />
    </div>
  );
}

function TabBarChevron() {
  return (
    <div className="content-stretch flex h-full items-center px-[4px] py-0 relative shrink-0" data-name="Tab bar Chevron">
      <IconContainer13 />
    </div>
  );
}

function BodyTabButton() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center max-w-[234px] px-[12px] py-[8px] relative shrink-0" data-name="Body Tab Button 1">
      <div aria-hidden="true" className="absolute border-[#111] border-[0px_0px_3px] border-solid inset-0 pointer-events-none" />
      <p className="basis-0 font-['Roboto:Bold',sans-serif] font-bold grow leading-[22px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#111] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Overview
      </p>
    </div>
  );
}

function BodyTabButton1() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center max-w-[234px] px-[12px] py-[8px] relative shrink-0" data-name="Body Tab Button 2">
      <div aria-hidden="true" className="absolute border-[#ddd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <p className="basis-0 font-['Roboto:Bold',sans-serif] font-bold grow leading-[22px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#666] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        History
      </p>
    </div>
  );
}

function BodyTabButton2() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center max-w-[234px] px-[12px] py-[8px] relative shrink-0" data-name="Body Tab Button 3">
      <div aria-hidden="true" className="absolute border-[#ddd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <p className="basis-0 font-['Roboto:Bold',sans-serif] font-bold grow leading-[22px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#666] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Geography
      </p>
    </div>
  );
}

function BodyTabButton3() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center max-w-[234px] px-[12px] py-[8px] relative shrink-0" data-name="Body Tab Button 4">
      <div aria-hidden="true" className="absolute border-[#ddd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <p className="basis-0 font-['Roboto:Bold',sans-serif] font-bold grow leading-[22px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#666] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Demographics
      </p>
    </div>
  );
}

function BodyTabButton4() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center max-w-[234px] px-[12px] py-[8px] relative shrink-0" data-name="Body Tab Button 5">
      <div aria-hidden="true" className="absolute border-[#ddd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <p className="basis-0 font-['Roboto:Bold',sans-serif] font-bold grow leading-[22px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#666] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Economy
      </p>
    </div>
  );
}

function BodyTabButton5() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center max-w-[234px] px-[12px] py-[8px] relative shrink-0" data-name="Body Tab Button 6">
      <div aria-hidden="true" className="absolute border-[#ddd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <p className="basis-0 font-['Roboto:Bold',sans-serif] font-bold grow leading-[22px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#666] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Culture
      </p>
    </div>
  );
}

function TabsContainer() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px overflow-x-auto overflow-y-clip relative shrink-0" data-name="Tabs Container">
      <BodyTabButton />
      <BodyTabButton1 />
      <BodyTabButton2 />
      <BodyTabButton3 />
      <BodyTabButton4 />
      <BodyTabButton5 />
    </div>
  );
}

function IconsChevronRight() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icons/Chevron-Right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icons/Chevron-Right">
          <path d={svgPaths.p37de0780} fill="var(--fill-0, #919191)" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function IconContainer14() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[16px]" data-name="Icon Container">
      <IconsChevronRight />
    </div>
  );
}

function TabBarChevron1() {
  return (
    <div className="content-stretch flex h-full items-center px-[4px] py-0 relative shrink-0" data-name="Tab bar Chevron">
      <IconContainer14 />
    </div>
  );
}

function GroupedTabBar() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Grouped Tab Bar">
      <div aria-hidden="true" className="absolute border-[#ddd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center self-stretch">
        <TabBarChevron />
      </div>
      <TabsContainer />
      <div className="flex flex-row items-center self-stretch">
        <TabBarChevron1 />
      </div>
    </div>
  );
}

function ContentBody() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="Content Body">
      <p className="-webkit-box basis-0 font-['Roboto:Regular',sans-serif] font-normal grow leading-[22px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#666] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Snippet Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ipsum nostrud exercitation ullamco laboris sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Snippet Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt. Snippet Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. `}</p>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Link">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#4007a2] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        See more on demo-url.com
      </p>
    </div>
  );
}

function Body2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start max-w-[608px] pb-[12px] pt-0 px-0 relative shrink-0 w-full" data-name="Body 2">
      <GroupedTabBar />
      <ContentBody />
      <Link2 />
    </div>
  );
}

function Attachment1() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[608px] relative shrink-0 w-[648px]" data-name="Attachment 2">
      <Body2 />
    </div>
  );
}

function AlgoBody() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start max-w-[608px] pb-[4px] pt-0 px-0 relative shrink-0 w-full z-[3]" data-name="Algo Body">
      <TitleAlgoTitle />
      <Attachment />
      <Attachment1 />
    </div>
  );
}

function Placeholder1() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px overflow-clip relative shrink-0" data-name="Placeholder">
      <div className="absolute bg-[#ccc] inset-0" data-name="image" />
    </div>
  );
}

function AvatarFavContainer1() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[2px] shrink-0 size-[16px]" data-name="Avatar & Fav Container">
      <Placeholder1 />
    </div>
  );
}

function Link3() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="Link">
      <p className="basis-0 font-['Roboto:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#4007a2] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Result Title
      </p>
    </div>
  );
}

function ResultName() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="ResultName">
      <Link3 />
    </div>
  );
}

function ResultTitleContainer() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Result Title Container">
      <AvatarFavContainer1 />
      <ResultName />
    </div>
  );
}

function Link4() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Link">
      <p className="basis-0 font-['Roboto:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#111] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Domain
      </p>
    </div>
  );
}

function Attribution() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[165px]" data-name="Attribution">
      <Link4 />
    </div>
  );
}

function ListItem5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip px-0 py-[2px] relative shrink-0 w-full" data-name="List item 1">
      <ResultTitleContainer />
      <Attribution />
    </div>
  );
}

function Placeholder2() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px overflow-clip relative shrink-0" data-name="Placeholder">
      <div className="absolute bg-[#ccc] inset-0" data-name="image" />
    </div>
  );
}

function AvatarFavContainer2() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[2px] shrink-0 size-[16px]" data-name="Avatar & Fav Container">
      <Placeholder2 />
    </div>
  );
}

function Link5() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="Link">
      <p className="basis-0 font-['Roboto:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#4007a2] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Result Title
      </p>
    </div>
  );
}

function ResultName1() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="ResultName">
      <Link5 />
    </div>
  );
}

function ResultTitleContainer1() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Result Title Container">
      <AvatarFavContainer2 />
      <ResultName1 />
    </div>
  );
}

function Link6() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Link">
      <p className="basis-0 font-['Roboto:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#111] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Domain
      </p>
    </div>
  );
}

function Attribution1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[165px]" data-name="Attribution">
      <Link6 />
    </div>
  );
}

function ListItem6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-0 py-[2px] relative shrink-0 w-full" data-name="List item 2">
      <ResultTitleContainer1 />
      <Attribution1 />
    </div>
  );
}

function Placeholder3() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px overflow-clip relative shrink-0" data-name="Placeholder">
      <div className="absolute bg-[#ccc] inset-0" data-name="image" />
    </div>
  );
}

function AvatarFavContainer3() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[2px] shrink-0 size-[16px]" data-name="Avatar & Fav Container">
      <Placeholder3 />
    </div>
  );
}

function Link7() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="Link">
      <p className="basis-0 font-['Roboto:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#4007a2] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Result Title
      </p>
    </div>
  );
}

function ResultName2() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="ResultName">
      <Link7 />
    </div>
  );
}

function ResultTitleContainer2() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Result Title Container">
      <AvatarFavContainer3 />
      <ResultName2 />
    </div>
  );
}

function Link8() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Link">
      <p className="basis-0 font-['Roboto:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#111] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Domain
      </p>
    </div>
  );
}

function Attribution2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[165px]" data-name="Attribution">
      <Link8 />
    </div>
  );
}

function ListItem7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip px-0 py-[2px] relative shrink-0 w-full" data-name="List item 3">
      <ResultTitleContainer2 />
      <Attribution2 />
    </div>
  );
}

function ListContainer1() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="List Container">
      <ListItem5 />
      <ListItem6 />
      <ListItem7 />
    </div>
  );
}

function Link9() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[592px]" data-name="Link">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[16px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#767676] text-[11px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>{`Recommended to you based on what's popular • Feedback`}</p>
    </div>
  );
}

function FooterExploreFurther() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Footer/Explore Further">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[28px] min-w-full relative shrink-0 text-[#666] text-[13px] uppercase w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        EXPLORE FURTHER
      </p>
      <ListContainer1 />
      <Link9 />
    </div>
  );
}

function AlgoFooter() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[608px] relative shrink-0 w-[648px]" data-name="Algo Footer">
      <FooterExploreFurther />
    </div>
  );
}

function AlgoFooter1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full z-[2]" data-name="Algo Footer">
      <AlgoFooter />
    </div>
  );
}

function Algoblock() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col gap-[4px] isolate items-start px-0 py-[16px] relative rounded-[6px] shrink-0 w-full" data-name="Algoblock">
      <AlgoHeader />
      <AlgoBody />
      <AlgoFooter1 />
    </div>
  );
}

function SectionTitlePropsInLeft() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-[24px] min-w-px relative shrink-0" data-name="Section Title/Props in Left">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[26px] min-w-full overflow-ellipsis overflow-hidden relative shrink-0 text-[#106ebe] text-[22px] text-nowrap w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        People also ask
      </p>
    </div>
  );
}

function SectionTitle() {
  return (
    <div className="relative shrink-0 w-full" data-name="Section Title">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[24px] items-center px-[20px] py-0 relative w-full">
          <SectionTitlePropsInLeft />
        </div>
      </div>
    </div>
  );
}

function Link10() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="Link">
      <p className="-webkit-box basis-0 font-['Roboto:Bold',sans-serif] font-bold grow leading-[22px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#111] text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>{`What is windows 11 copilot & how does it work?`}</p>
    </div>
  );
}

function IconsChat() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icons/Chat">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icons/Chat">
          <path d={svgPaths.p283f600} fill="var(--fill-0, #174AE4)" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function IconContainer15() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[24px]" data-name="Icon Container">
      <IconsChat />
    </div>
  );
}

function PeopleAlsoAskTitle() {
  return (
    <div className="relative shrink-0 w-full" data-name="People also ask/Title">
      <div className="size-full">
        <div className="content-stretch flex gap-[4px] items-start pb-[4px] pt-[16px] px-[16px] relative w-full">
          <Link10 />
          <IconContainer15 />
        </div>
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex items-start pb-[4px] pt-0 px-0 relative shrink-0 w-full" data-name="Body">
      <p className="-webkit-box basis-0 font-['Roboto:Regular',sans-serif] font-normal grow leading-[22px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#444] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Snippet Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ipsum nostrud exercitation ullamco laboris sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
  );
}

function Divider1() {
  return (
    <div className="h-px max-h-px min-h-px relative shrink-0 w-full" data-name="Divider">
      <div className="absolute inset-[0_-0.2%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 249 1">
          <g id="Divider">
            <path d="M0.5 0.5H248.5" id="Line 1" stroke="var(--stroke-0, #DDDDDD)" strokeLinecap="round" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Link11() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Link">
      <p className="basis-0 font-['Roboto:Regular',sans-serif] font-normal grow leading-[22px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#4007a2] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Announcing Microsoft Copilot, your everyday AI companion
      </p>
    </div>
  );
}

function Fav() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Fav">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_73394)" id="Fav">
          <path d="M7.6055 0H0V7.6055H7.6055V0Z" fill="var(--fill-0, #F26522)" id="Vector" />
          <path d="M16 0H8.39447V7.6055H16V0Z" fill="var(--fill-0, #8DC63F)" id="Vector_2" />
          <path d={svgPaths.pe086c80} fill="var(--fill-0, #00AEEF)" id="Vector_3" />
          <path d={svgPaths.p16522600} fill="var(--fill-0, #FFC20E)" id="Vector_4" />
        </g>
        <defs>
          <clipPath id="clip0_1_73394">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function AvatarFavContainer4() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[2px] shrink-0 size-[16px]" data-name="Avatar & Fav Container">
      <Fav />
    </div>
  );
}

function Url1() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="url">
      <p className="basis-0 font-['Roboto:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#006d21] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        news.microsoft.com/apac/2023/09/21/announcing-microsoft
      </p>
    </div>
  );
}

function Link12() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Link">
      <AvatarFavContainer4 />
      <Url1 />
    </div>
  );
}

function Link13() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-full" data-name="Link">
      <Link11 />
      <Link12 />
    </div>
  );
}

function AnswerContainer() {
  return (
    <div className="relative shrink-0 w-full" data-name="Answer Container">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start pb-[16px] pt-[8px] px-[16px] relative w-full">
          <Body />
          <Divider1 />
          <Link13 />
        </div>
      </div>
    </div>
  );
}

function PeopleAlsoAskCardContent() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="People also ask Card Content">
      <PeopleAlsoAskTitle />
      <AnswerContainer />
    </div>
  );
}

function ModuleContainer() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="Module Container">
      <PeopleAlsoAskCardContent />
    </div>
  );
}

function FreeScaleCard() {
  return (
    <div className="bg-white h-[263px] relative rounded-[6px] shrink-0 w-[280px]" data-name="Free Scale Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <ModuleContainer />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Link14() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="Link">
      <p className="-webkit-box basis-0 font-['Roboto:Bold',sans-serif] font-bold grow leading-[22px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#111] text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>{`What is windows 11 copilot & how does it work?`}</p>
    </div>
  );
}

function IconsChat1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icons/Chat">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icons/Chat">
          <path d={svgPaths.p283f600} fill="var(--fill-0, #174AE4)" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function IconContainer16() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[24px]" data-name="Icon Container">
      <IconsChat1 />
    </div>
  );
}

function PeopleAlsoAskTitle1() {
  return (
    <div className="relative shrink-0 w-full" data-name="People also ask/Title">
      <div className="size-full">
        <div className="content-stretch flex gap-[4px] items-start pb-[4px] pt-[16px] px-[16px] relative w-full">
          <Link14 />
          <IconContainer16 />
        </div>
      </div>
    </div>
  );
}

function Body3() {
  return (
    <div className="content-stretch flex items-start pb-[4px] pt-0 px-0 relative shrink-0 w-full" data-name="Body">
      <p className="-webkit-box basis-0 font-['Roboto:Regular',sans-serif] font-normal grow leading-[22px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#444] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Snippet Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ipsum nostrud exercitation ullamco laboris sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
  );
}

function Divider2() {
  return (
    <div className="h-px max-h-px min-h-px relative shrink-0 w-full" data-name="Divider">
      <div className="absolute inset-[0_-0.2%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 249 1">
          <g id="Divider">
            <path d="M0.5 0.5H248.5" id="Line 1" stroke="var(--stroke-0, #DDDDDD)" strokeLinecap="round" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Link15() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[248px]" data-name="Link">
      <p className="basis-0 font-['Roboto:Regular',sans-serif] font-normal grow leading-[22px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#4007a2] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Announcing Microsoft Copilot, your everyday AI companion
      </p>
    </div>
  );
}

function Fav1() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Fav">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_73394)" id="Fav">
          <path d="M7.6055 0H0V7.6055H7.6055V0Z" fill="var(--fill-0, #F26522)" id="Vector" />
          <path d="M16 0H8.39447V7.6055H16V0Z" fill="var(--fill-0, #8DC63F)" id="Vector_2" />
          <path d={svgPaths.pe086c80} fill="var(--fill-0, #00AEEF)" id="Vector_3" />
          <path d={svgPaths.p16522600} fill="var(--fill-0, #FFC20E)" id="Vector_4" />
        </g>
        <defs>
          <clipPath id="clip0_1_73394">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function AvatarFavContainer5() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[2px] shrink-0 size-[16px]" data-name="Avatar & Fav Container">
      <Fav1 />
    </div>
  );
}

function Url2() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="url">
      <p className="basis-0 font-['Roboto:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#006d21] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        news.microsoft.com/apac/2023/09/21/announcing-microsoft
      </p>
    </div>
  );
}

function Link16() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Link">
      <AvatarFavContainer5 />
      <Url2 />
    </div>
  );
}

function Link17() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-full" data-name="Link">
      <Link15 />
      <Link16 />
    </div>
  );
}

function AnswerContainer1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Answer Container">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start pb-[16px] pt-[8px] px-[16px] relative w-full">
          <Body3 />
          <Divider2 />
          <Link17 />
        </div>
      </div>
    </div>
  );
}

function PeopleAlsoAskCardContent1() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="People also ask Card Content">
      <PeopleAlsoAskTitle1 />
      <AnswerContainer1 />
    </div>
  );
}

function ModuleContainer1() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="Module Container">
      <PeopleAlsoAskCardContent1 />
    </div>
  );
}

function FreeScaleCard1() {
  return (
    <div className="bg-white h-[263px] relative rounded-[6px] shrink-0 w-[280px]" data-name="Free Scale Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <ModuleContainer1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function MainlinePeopleAlsoAsk() {
  return (
    <div className="relative shrink-0 w-full" data-name="Mainline/People also ask">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-start px-[4px] py-[2px] relative w-full">
          {[...Array(3).keys()].map((_, i) => (
            <FreeScaleCard key={i} />
          ))}
          <FreeScaleCard1 />
        </div>
      </div>
    </div>
  );
}

function FadeRight() {
  return <div className="absolute bottom-0 right-[-1px] top-[-3px] w-[24px]" data-name="fade right" style={{ backgroundImage: "linear-gradient(-90deg, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)" }} />;
}

function IconsChevronLeft1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icons/Chevron-Left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_1_73355)" id="Icons/Chevron-Left">
          <path d={svgPaths.p39caf500} fill="var(--fill-0, #767676)" id="Shape" />
        </g>
        <defs>
          <clipPath id="clip0_1_73355">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IconContainer17() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-1/2 size-[14px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Icon Container">
      <IconsChevronLeft1 />
    </div>
  );
}

function BaseCircle() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0 size-[32px]" data-name="Base Circle">
      <div className="relative shrink-0 size-[32px]">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(255, 255, 255, 1)", "--stroke-0": "rgba(221, 221, 221, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <circle cx="16" cy="16" fill="var(--fill-0, white)" id="Ellipse 1" r="15.5" stroke="var(--stroke-0, #DDDDDD)" />
          </svg>
        </div>
      </div>
      <IconContainer17 />
    </div>
  );
}

function CarouselButtonsMainlineCarousel() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-start left-[-16px] opacity-0 shadow-[0px_2px_3px_0px_rgba(0,0,0,0.1)] top-[calc(50%+0.5px)] translate-y-[-50%]" data-name="Carousel Buttons/Mainline Carousel">
      <BaseCircle />
    </div>
  );
}

function IconsChevronRight1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icons/Chevron-Right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_1_73613)" id="Icons/Chevron-Right">
          <path d={svgPaths.p2134100} fill="var(--fill-0, #767676)" id="Shape" />
        </g>
        <defs>
          <clipPath id="clip0_1_73613">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IconContainer18() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-1/2 size-[14px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Icon Container">
      <IconsChevronRight1 />
    </div>
  );
}

function BaseCircle1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0 size-[32px]" data-name="Base Circle">
      <div className="relative shrink-0 size-[32px]">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(255, 255, 255, 1)", "--stroke-0": "rgba(221, 221, 221, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <circle cx="16" cy="16" fill="var(--fill-0, white)" id="Ellipse 1" r="15.5" stroke="var(--stroke-0, #DDDDDD)" />
          </svg>
        </div>
      </div>
      <IconContainer18 />
    </div>
  );
}

function CarouselButtonsMainlineCarousel1() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-start right-[-14px] shadow-[0px_2px_3px_0px_rgba(0,0,0,0.1)] top-[calc(50%+0.5px)] translate-y-[-50%]" data-name="Carousel Buttons/Mainline Carousel">
      <BaseCircle1 />
    </div>
  );
}

function CarouselContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Carousel Container">
      <MainlinePeopleAlsoAsk />
      <FadeRight />
      <CarouselButtonsMainlineCarousel />
      <CarouselButtonsMainlineCarousel1 />
    </div>
  );
}

function MainlineCarouselSildeToEnd() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Mainline Carousel/Silde to end">
      <SectionTitle />
      <CarouselContainer />
    </div>
  );
}

function IconsClose() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icons/Close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_73669)" id="Icons/Close">
          <path d={svgPaths.p352e6440} fill="var(--fill-0, #767676)" id="Shape" />
        </g>
        <defs>
          <clipPath id="clip0_1_73669">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BaseIcon() {
  return (
    <div className="absolute content-stretch flex inset-0 items-center justify-center" data-name="Base Icon">
      <IconsClose />
    </div>
  );
}

function FeedbackButton() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Feedback Button">
      <BaseIcon />
      <div className="absolute inset-0 opacity-0" data-name="Hover Image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgHoverImage} />
      </div>
    </div>
  );
}

function IconsClose1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icons/Close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_73669)" id="Icons/Close">
          <path d={svgPaths.p352e6440} fill="var(--fill-0, #767676)" id="Shape" />
        </g>
        <defs>
          <clipPath id="clip0_1_73669">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BaseIcon1() {
  return (
    <div className="absolute content-stretch flex inset-0 items-center justify-center" data-name="Base Icon">
      <IconsClose1 />
    </div>
  );
}

function FeedbackButton1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Feedback Button">
      <BaseIcon1 />
      <div className="absolute inset-0 opacity-0" data-name="Hover Image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgHoverImage1} />
      </div>
    </div>
  );
}

function IconButtonContainer() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0" data-name="icon Button Container">
      <FeedbackButton />
      <FeedbackButton1 />
    </div>
  );
}

function Feedback() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Feedback">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[13px] relative shrink-0 text-[#444] text-[11px] text-nowrap text-right" style={{ fontVariationSettings: "'wdth' 100" }}>
        Feedback
      </p>
      <IconButtonContainer />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col items-end pb-0 pt-[4px] px-0 relative shrink-0 w-full">
      <Feedback />
    </div>
  );
}

function MainlineCarouselPeopleAlsoAsk() {
  return (
    <div className="content-stretch flex flex-col items-start pb-0 pt-[16px] px-0 relative shrink-0 w-full" data-name="Mainline Carousel/People also ask">
      <MainlineCarouselSildeToEnd />
      <Frame5 />
    </div>
  );
}

function ComponentContainer() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Component Container">
      <MainlineCarouselPeopleAlsoAsk />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative rounded-[6px] shrink-0 w-full" data-name="Container">
      <ComponentContainer />
    </div>
  );
}

function AnswerContainer2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Answer Container">
      <Container8 />
    </div>
  );
}

function PeopleAlsoAsk() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="People also ask">
      <AnswerContainer2 />
    </div>
  );
}

function PeopleAlsoAsk1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="People also ask">
      <PeopleAlsoAsk />
    </div>
  );
}

function Placeholder4() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px overflow-clip relative rounded-[2px] shrink-0" data-name="Placeholder">
      <div className="absolute bg-[#ccc] inset-0" data-name="image" />
    </div>
  );
}

function AvatarFavContainer6() {
  return (
    <div className="bg-[#f5f5f5] relative rounded-[9999px] shrink-0 size-[26px]" data-name="Avatar & Fav Container">
      <div className="content-stretch flex items-center justify-center overflow-clip p-[6px] relative rounded-[inherit] size-full">
        <Placeholder4 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ececec] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function Url3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="url">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#111] text-[13px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        www.algoloremipsum-attribution.com
      </p>
    </div>
  );
}

function Link18() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Link">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#4007a2] text-[13px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Cached
      </p>
    </div>
  );
}

function UrlDropdown1() {
  return (
    <div className="content-stretch flex flex-col items-start p-[10px] relative shrink-0" data-name="url dropdown">
      <Link18 />
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#666] text-[13px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        AI-generated caption
      </p>
    </div>
  );
}

function DropdownContent3() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative rounded-[6px] shadow-[0px_2px_4px_1px_rgba(0,0,0,0.18),0px_0px_0px_1px_rgba(0,0,0,0.05)] shrink-0" data-name="Dropdown Content">
      <UrlDropdown1 />
    </div>
  );
}

function DropdownComponent3() {
  return (
    <div className="absolute h-px opacity-0 right-0 shadow-[0px_2px_4px_1px_rgba(0,0,0,0.18),0px_0px_0px_1px_rgba(0,0,0,0.05)] top-0" data-name="Dropdown Component">
      <div className="size-full">
        <div className="content-stretch flex flex-col h-full items-start pb-0 pt-[20px] px-0 relative">
          <DropdownContent3 />
        </div>
      </div>
    </div>
  );
}

function IconsCaretDown1() {
  return (
    <div className="relative shrink-0 size-[8px]" data-name="Icons/Caret Down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
        <g id="Icons/Caret Down">
          <path d={svgPaths.p50f600} fill="var(--fill-0, #767676)" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function IconContainer19() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Icon Container">
      <IconsCaretDown1 />
    </div>
  );
}

function Trigger3() {
  return (
    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-px min-w-px relative shrink-0 w-full" data-name="Trigger">
      <IconContainer19 />
    </div>
  );
}

function TriggerContainer3() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px relative shrink-0 w-full" data-name="Trigger Container">
      <Trigger3 />
    </div>
  );
}

function Dropdown3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-full items-start justify-center relative shrink-0 w-[16px]" data-name="Dropdown">
      <DropdownComponent3 />
      <TriggerContainer3 />
    </div>
  );
}

function AlgoAttribution1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Algo Attribution">
      <Url3 />
      <div className="flex flex-row items-center self-stretch">
        <Dropdown3 />
      </div>
    </div>
  );
}

function TextAttribution1() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="Text attribution">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#111] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Site name lorem ipsum
      </p>
      <AlgoAttribution1 />
    </div>
  );
}

function ResultTop1() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Result Top">
      <AvatarFavContainer6 />
      <TextAttribution1 />
    </div>
  );
}

function AlgoHeader1() {
  return (
    <div className="content-stretch flex items-start max-w-[608px] relative shrink-0 w-full z-[4]" data-name="Algo Header">
      <ResultTop1 />
    </div>
  );
}

function Link19() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="Link">
      <p className="basis-0 font-['Roboto:Regular',sans-serif] font-normal grow leading-[24px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#4007a2] text-[20px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>{`Title Lorem Ipsum Dolor Consectatur `}</p>
    </div>
  );
}

function TitleAlgoTitle1() {
  return (
    <div className="max-w-[608px] relative shrink-0 w-full" data-name="Title/Algo Title">
      <div className="max-w-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-start max-w-[inherit] pl-0 pr-[10px] py-0 relative w-full">
          <Link19 />
        </div>
      </div>
    </div>
  );
}

function BaseBadge1() {
  return (
    <div className="bg-white content-stretch flex gap-[6px] items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="Base Badge">
      <div aria-hidden="true" className="absolute border border-[#ddd] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[12px] relative shrink-0 text-[#666] text-[11px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Web
      </p>
    </div>
  );
}

function WebsiteTypeBadge1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Website Type Badge">
      <BaseBadge1 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex font-['Roboto:Regular',sans-serif] font-normal gap-[4px] items-center leading-[22px] relative shrink-0 text-[#666] text-[14px] text-nowrap">
      <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        Oct 26, 2018
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        ·
      </p>
    </div>
  );
}

function Date1() {
  return (
    <div className="absolute content-stretch flex gap-[4px] items-center left-0 pl-0 pr-[4px] py-0 top-0" data-name="Date">
      <WebsiteTypeBadge1 />
      <Frame3 />
    </div>
  );
}

function TextContent1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Text Content">
      <p className="-webkit-box [text-indent:122px] font-['Roboto:Regular',sans-serif] font-normal leading-[22px] min-w-full overflow-ellipsis overflow-hidden relative shrink-0 text-[#666] text-[14px] w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Snippet Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ipsum nostrud exercitation ullamco laboris sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Snippet Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt. Snippet Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. `}</p>
      <Date1 />
    </div>
  );
}

function SnippetContainer1() {
  return (
    <div className="content-stretch flex gap-[10px] items-start relative shrink-0 w-full" data-name="Snippet Container">
      <TextContent1 />
    </div>
  );
}

function Body4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Body 1">
      <SnippetContainer1 />
    </div>
  );
}

function Attachment2() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[608px] relative shrink-0 w-[648px]" data-name="Attachment 1">
      <Body4 />
    </div>
  );
}

function AlgoBody1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start max-w-[608px] pb-[4px] pt-0 px-0 relative shrink-0 w-full z-[3]" data-name="Algo Body">
      <TitleAlgoTitle1 />
      <Attachment2 />
    </div>
  );
}

function Algoblock1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] relative rounded-[6px] shrink-0 w-full" data-name="Algoblock">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[4px] isolate items-start px-[20px] py-[16px] relative w-full">
          <AlgoHeader1 />
          <AlgoBody1 />
        </div>
      </div>
    </div>
  );
}

function Link20() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Link">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[22px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#111] text-[18px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Related News
      </p>
    </div>
  );
}

function SectionTitlePropsInLeft1() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-[24px] min-w-px relative shrink-0" data-name="Section Title/Props in Left">
      <Link20 />
    </div>
  );
}

function SectionTitle1() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full" data-name="Section Title">
      <SectionTitlePropsInLeft1 />
    </div>
  );
}

function Details() {
  return (
    <div className="content-stretch flex font-['Roboto:Regular',sans-serif] font-normal gap-[2px] items-start leading-[20px] relative shrink-0 text-[#666] text-[13px] text-nowrap w-full" data-name="Details">
      <p className="overflow-ellipsis overflow-hidden relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        NewSource
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        ·
      </p>
      <p className="overflow-ellipsis overflow-hidden relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        1d
      </p>
    </div>
  );
}

function Title2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[176px]" data-name="Title">
      <p className="-webkit-box basis-0 font-['Roboto:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#4007a2] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Microsoft earnings: Tech giant to report Q2 earnings as AI mania pushes stock higher
      </p>
    </div>
  );
}

function Content() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-full items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <Details />
      <Title2 />
    </div>
  );
}

function Placeholder5() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px overflow-clip relative shrink-0" data-name="Placeholder">
      <div className="absolute bg-[#ececec] inset-0" data-name="image" />
    </div>
  );
}

function Square() {
  return (
    <div className="absolute bg-[#ececec] content-stretch flex items-start left-1/2 overflow-clip size-[80px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Square">
      <Placeholder5 />
    </div>
  );
}

function Thumbnail() {
  return (
    <div className="overflow-clip relative rounded-[4px] shrink-0 size-[80px]" data-name="Thumbnail">
      <Square />
    </div>
  );
}

function SmallNewsCardContent() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Small News Card Content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative size-full">
          <Content />
          <Thumbnail />
        </div>
      </div>
    </div>
  );
}

function ModuleContainer2() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="Module Container">
      <SmallNewsCardContent />
    </div>
  );
}

function FreeScaleCard2() {
  return (
    <div className="bg-white h-[112px] relative rounded-[6px] shrink-0 w-[300px]" data-name="Free Scale Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <ModuleContainer2 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Details1() {
  return (
    <div className="content-stretch flex font-['Roboto:Regular',sans-serif] font-normal gap-[2px] items-start leading-[20px] relative shrink-0 text-[#666] text-[13px] text-nowrap w-full" data-name="Details">
      <p className="overflow-ellipsis overflow-hidden relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        NewSource
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        ·
      </p>
      <p className="overflow-ellipsis overflow-hidden relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        1d
      </p>
    </div>
  );
}

function Title3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[176px]" data-name="Title">
      <p className="-webkit-box basis-0 font-['Roboto:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#4007a2] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Microsoft earnings: Tech giant to report Q2 earnings as AI mania pushes stock higher
      </p>
    </div>
  );
}

function Content1() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-full items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <Details1 />
      <Title3 />
    </div>
  );
}

function Placeholder6() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px overflow-clip relative shrink-0" data-name="Placeholder">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgPlaceholder} />
    </div>
  );
}

function Square1() {
  return (
    <div className="absolute bg-[#ececec] content-stretch flex items-start left-1/2 overflow-clip size-[80px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Square">
      <Placeholder6 />
    </div>
  );
}

function Thumbnail1() {
  return (
    <div className="overflow-clip relative rounded-[4px] shrink-0 size-[80px]" data-name="Thumbnail">
      <Square1 />
    </div>
  );
}

function SmallNewsCardContent1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Small News Card Content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative size-full">
          <Content1 />
          <Thumbnail1 />
        </div>
      </div>
    </div>
  );
}

function ModuleContainer3() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="Module Container">
      <SmallNewsCardContent1 />
    </div>
  );
}

function FreeScaleCard3() {
  return (
    <div className="bg-white h-[112px] relative rounded-[6px] shrink-0 w-[300px]" data-name="Free Scale Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <ModuleContainer3 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0">
      <FreeScaleCard2 />
      <FreeScaleCard3 />
    </div>
  );
}

function Details2() {
  return (
    <div className="content-stretch flex font-['Roboto:Regular',sans-serif] font-normal gap-[2px] items-start leading-[20px] relative shrink-0 text-[#666] text-[13px] text-nowrap w-full" data-name="Details">
      <p className="overflow-ellipsis overflow-hidden relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        NewSource
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        ·
      </p>
      <p className="overflow-ellipsis overflow-hidden relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        1d
      </p>
    </div>
  );
}

function Title4() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[176px]" data-name="Title">
      <p className="-webkit-box basis-0 font-['Roboto:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#4007a2] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Microsoft earnings: Tech giant to report Q2 earnings as AI mania pushes stock higher
      </p>
    </div>
  );
}

function Content2() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-full items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <Details2 />
      <Title4 />
    </div>
  );
}

function Placeholder7() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px overflow-clip relative shrink-0" data-name="Placeholder">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgPlaceholder} />
    </div>
  );
}

function Square2() {
  return (
    <div className="absolute bg-[#ececec] content-stretch flex items-start left-1/2 overflow-clip size-[80px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Square">
      <Placeholder7 />
    </div>
  );
}

function Thumbnail2() {
  return (
    <div className="overflow-clip relative rounded-[4px] shrink-0 size-[80px]" data-name="Thumbnail">
      <Square2 />
    </div>
  );
}

function SmallNewsCardContent2() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Small News Card Content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative size-full">
          <Content2 />
          <Thumbnail2 />
        </div>
      </div>
    </div>
  );
}

function ModuleContainer4() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="Module Container">
      <SmallNewsCardContent2 />
    </div>
  );
}

function FreeScaleCard4() {
  return (
    <div className="bg-white h-[112px] relative rounded-[6px] shrink-0 w-[300px]" data-name="Free Scale Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <ModuleContainer4 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Details3() {
  return (
    <div className="content-stretch flex font-['Roboto:Regular',sans-serif] font-normal gap-[2px] items-start leading-[20px] relative shrink-0 text-[#666] text-[13px] text-nowrap w-full" data-name="Details">
      <p className="overflow-ellipsis overflow-hidden relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        NewSource
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        ·
      </p>
      <p className="overflow-ellipsis overflow-hidden relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        1d
      </p>
    </div>
  );
}

function Title5() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[176px]" data-name="Title">
      <p className="-webkit-box basis-0 font-['Roboto:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#4007a2] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Microsoft earnings: Tech giant to report Q2 earnings as AI mania pushes stock higher
      </p>
    </div>
  );
}

function Content3() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-full items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <Details3 />
      <Title5 />
    </div>
  );
}

function Placeholder8() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px overflow-clip relative shrink-0" data-name="Placeholder">
      <div className="absolute bg-[#ececec] inset-0" data-name="image" />
    </div>
  );
}

function Square3() {
  return (
    <div className="absolute bg-[#ececec] content-stretch flex items-start left-1/2 overflow-clip size-[80px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Square">
      <Placeholder8 />
    </div>
  );
}

function Thumbnail3() {
  return (
    <div className="overflow-clip relative rounded-[4px] shrink-0 size-[80px]" data-name="Thumbnail">
      <Square3 />
    </div>
  );
}

function SmallNewsCardContent3() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Small News Card Content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative size-full">
          <Content3 />
          <Thumbnail3 />
        </div>
      </div>
    </div>
  );
}

function ModuleContainer5() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="Module Container">
      <SmallNewsCardContent3 />
    </div>
  );
}

function FreeScaleCard5() {
  return (
    <div className="bg-white h-[112px] relative rounded-[6px] shrink-0 w-[300px]" data-name="Free Scale Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <ModuleContainer5 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0">
      <FreeScaleCard4 />
      <FreeScaleCard5 />
    </div>
  );
}

function Slide() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center px-0 py-[2px] relative shrink-0 w-[608px]" data-name="Slide 1">
      <Frame6 />
      <Frame7 />
    </div>
  );
}

function Details4() {
  return (
    <div className="content-stretch flex font-['Roboto:Regular',sans-serif] font-normal gap-[2px] items-start leading-[20px] relative shrink-0 text-[#666] text-[13px] text-nowrap w-full" data-name="Details">
      <p className="overflow-ellipsis overflow-hidden relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        NewSource
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        ·
      </p>
      <p className="overflow-ellipsis overflow-hidden relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        1d
      </p>
    </div>
  );
}

function Title6() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[176px]" data-name="Title">
      <p className="-webkit-box basis-0 font-['Roboto:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#4007a2] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Microsoft earnings: Tech giant to report Q2 earnings as AI mania pushes stock higher
      </p>
    </div>
  );
}

function Content4() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-full items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <Details4 />
      <Title6 />
    </div>
  );
}

function Placeholder9() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px overflow-clip relative shrink-0" data-name="Placeholder">
      <div className="absolute bg-[#ececec] inset-0" data-name="image" />
    </div>
  );
}

function Square4() {
  return (
    <div className="absolute bg-[#ececec] content-stretch flex items-start left-1/2 overflow-clip size-[80px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Square">
      <Placeholder9 />
    </div>
  );
}

function Thumbnail4() {
  return (
    <div className="overflow-clip relative rounded-[4px] shrink-0 size-[80px]" data-name="Thumbnail">
      <Square4 />
    </div>
  );
}

function SmallNewsCardContent4() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Small News Card Content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative size-full">
          <Content4 />
          <Thumbnail4 />
        </div>
      </div>
    </div>
  );
}

function ModuleContainer6() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="Module Container">
      <SmallNewsCardContent4 />
    </div>
  );
}

function FreeScaleCard6() {
  return (
    <div className="bg-white h-[112px] relative rounded-[6px] shrink-0 w-[300px]" data-name="Free Scale Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <ModuleContainer6 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Details5() {
  return (
    <div className="content-stretch flex font-['Roboto:Regular',sans-serif] font-normal gap-[2px] items-start leading-[20px] relative shrink-0 text-[#666] text-[13px] text-nowrap w-full" data-name="Details">
      <p className="overflow-ellipsis overflow-hidden relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        NewSource
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        ·
      </p>
      <p className="overflow-ellipsis overflow-hidden relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        1d
      </p>
    </div>
  );
}

function Title7() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[176px]" data-name="Title">
      <p className="-webkit-box basis-0 font-['Roboto:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#4007a2] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Microsoft earnings: Tech giant to report Q2 earnings as AI mania pushes stock higher
      </p>
    </div>
  );
}

function Content5() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-full items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <Details5 />
      <Title7 />
    </div>
  );
}

function Placeholder10() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px overflow-clip relative shrink-0" data-name="Placeholder">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgPlaceholder} />
    </div>
  );
}

function Square5() {
  return (
    <div className="absolute bg-[#ececec] content-stretch flex items-start left-1/2 overflow-clip size-[80px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Square">
      <Placeholder10 />
    </div>
  );
}

function Thumbnail5() {
  return (
    <div className="overflow-clip relative rounded-[4px] shrink-0 size-[80px]" data-name="Thumbnail">
      <Square5 />
    </div>
  );
}

function SmallNewsCardContent5() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Small News Card Content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative size-full">
          <Content5 />
          <Thumbnail5 />
        </div>
      </div>
    </div>
  );
}

function ModuleContainer7() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="Module Container">
      <SmallNewsCardContent5 />
    </div>
  );
}

function FreeScaleCard7() {
  return (
    <div className="bg-white h-[112px] relative rounded-[6px] shrink-0 w-[300px]" data-name="Free Scale Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <ModuleContainer7 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0">
      <FreeScaleCard6 />
      <FreeScaleCard7 />
    </div>
  );
}

function Details6() {
  return (
    <div className="content-stretch flex font-['Roboto:Regular',sans-serif] font-normal gap-[2px] items-start leading-[20px] relative shrink-0 text-[#666] text-[13px] text-nowrap w-full" data-name="Details">
      <p className="overflow-ellipsis overflow-hidden relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        NewSource
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        ·
      </p>
      <p className="overflow-ellipsis overflow-hidden relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        1d
      </p>
    </div>
  );
}

function Title8() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[176px]" data-name="Title">
      <p className="-webkit-box basis-0 font-['Roboto:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#4007a2] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Microsoft earnings: Tech giant to report Q2 earnings as AI mania pushes stock higher
      </p>
    </div>
  );
}

function Content6() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-full items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <Details6 />
      <Title8 />
    </div>
  );
}

function Placeholder11() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px overflow-clip relative shrink-0" data-name="Placeholder">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgPlaceholder} />
    </div>
  );
}

function Square6() {
  return (
    <div className="absolute bg-[#ececec] content-stretch flex items-start left-1/2 overflow-clip size-[80px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Square">
      <Placeholder11 />
    </div>
  );
}

function Thumbnail6() {
  return (
    <div className="overflow-clip relative rounded-[4px] shrink-0 size-[80px]" data-name="Thumbnail">
      <Square6 />
    </div>
  );
}

function SmallNewsCardContent6() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Small News Card Content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative size-full">
          <Content6 />
          <Thumbnail6 />
        </div>
      </div>
    </div>
  );
}

function ModuleContainer8() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="Module Container">
      <SmallNewsCardContent6 />
    </div>
  );
}

function FreeScaleCard8() {
  return (
    <div className="bg-white h-[112px] relative rounded-[6px] shrink-0 w-[300px]" data-name="Free Scale Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <ModuleContainer8 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Details7() {
  return (
    <div className="content-stretch flex font-['Roboto:Regular',sans-serif] font-normal gap-[2px] items-start leading-[20px] relative shrink-0 text-[#666] text-[13px] text-nowrap w-full" data-name="Details">
      <p className="overflow-ellipsis overflow-hidden relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        NewSource
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        ·
      </p>
      <p className="overflow-ellipsis overflow-hidden relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        1d
      </p>
    </div>
  );
}

function Title9() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[176px]" data-name="Title">
      <p className="-webkit-box basis-0 font-['Roboto:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#4007a2] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Microsoft earnings: Tech giant to report Q2 earnings as AI mania pushes stock higher
      </p>
    </div>
  );
}

function Content7() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-full items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <Details7 />
      <Title9 />
    </div>
  );
}

function Placeholder12() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px overflow-clip relative shrink-0" data-name="Placeholder">
      <div className="absolute bg-[#ececec] inset-0" data-name="image" />
    </div>
  );
}

function Square7() {
  return (
    <div className="absolute bg-[#ececec] content-stretch flex items-start left-1/2 overflow-clip size-[80px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Square">
      <Placeholder12 />
    </div>
  );
}

function Thumbnail7() {
  return (
    <div className="overflow-clip relative rounded-[4px] shrink-0 size-[80px]" data-name="Thumbnail">
      <Square7 />
    </div>
  );
}

function SmallNewsCardContent7() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Small News Card Content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative size-full">
          <Content7 />
          <Thumbnail7 />
        </div>
      </div>
    </div>
  );
}

function ModuleContainer9() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="Module Container">
      <SmallNewsCardContent7 />
    </div>
  );
}

function FreeScaleCard9() {
  return (
    <div className="bg-white h-[112px] relative rounded-[6px] shrink-0 w-[300px]" data-name="Free Scale Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <ModuleContainer9 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0">
      <FreeScaleCard8 />
      <FreeScaleCard9 />
    </div>
  );
}

function Slide1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center px-0 py-[2px] relative shrink-0 w-[608px]" data-name="Slide 2">
      <Frame8 />
      <Frame9 />
    </div>
  );
}

function SlideContainer() {
  return (
    <div className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-name="Slide Container">
      <Slide />
      <Slide1 />
    </div>
  );
}

function IconsChevronLeft2() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icons/Chevron-Left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_1_73355)" id="Icons/Chevron-Left">
          <path d={svgPaths.p39caf500} fill="var(--fill-0, #767676)" id="Shape" />
        </g>
        <defs>
          <clipPath id="clip0_1_73355">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IconContainer20() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-1/2 size-[14px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Icon Container">
      <IconsChevronLeft2 />
    </div>
  );
}

function BaseCircle2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0 size-[32px]" data-name="Base Circle">
      <div className="relative shrink-0 size-[32px]">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(255, 255, 255, 1)", "--stroke-0": "rgba(221, 221, 221, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <circle cx="16" cy="16" fill="var(--fill-0, white)" id="Ellipse 1" r="15.5" stroke="var(--stroke-0, #DDDDDD)" />
          </svg>
        </div>
      </div>
      <IconContainer20 />
    </div>
  );
}

function CarouselButtonsMainlineCarousel2() {
  return (
    <div className="absolute content-stretch flex items-start left-[-14px] opacity-0 shadow-[0px_2px_3px_0px_rgba(0,0,0,0.1)] top-1/2 translate-y-[-50%]" data-name="Carousel Buttons/Mainline Carousel">
      <BaseCircle2 />
    </div>
  );
}

function IconsChevronRight2() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icons/Chevron-Right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_1_73613)" id="Icons/Chevron-Right">
          <path d={svgPaths.p2134100} fill="var(--fill-0, #767676)" id="Shape" />
        </g>
        <defs>
          <clipPath id="clip0_1_73613">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IconContainer21() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-1/2 size-[14px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Icon Container">
      <IconsChevronRight2 />
    </div>
  );
}

function BaseCircle3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0 size-[32px]" data-name="Base Circle">
      <div className="relative shrink-0 size-[32px]">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(255, 255, 255, 1)", "--stroke-0": "rgba(221, 221, 221, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <circle cx="16" cy="16" fill="var(--fill-0, white)" id="Ellipse 1" r="15.5" stroke="var(--stroke-0, #DDDDDD)" />
          </svg>
        </div>
      </div>
      <IconContainer21 />
    </div>
  );
}

function CarouselButtonsMainlineCarousel3() {
  return (
    <div className="absolute content-stretch flex items-start right-[-14px] shadow-[0px_2px_3px_0px_rgba(0,0,0,0.1)] top-1/2 translate-y-[-50%]" data-name="Carousel Buttons/Mainline Carousel">
      <BaseCircle3 />
    </div>
  );
}

function CarouselContainer1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Carousel Container">
      <SlideContainer />
      <CarouselButtonsMainlineCarousel2 />
      <CarouselButtonsMainlineCarousel3 />
    </div>
  );
}

function MainlineCarouselSlideBySlide() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Mainline Carousel/Slide by slide">
      <SectionTitle1 />
      <CarouselContainer1 />
    </div>
  );
}

function MainlineCarouselRelatedNews() {
  return (
    <div className="relative shrink-0 w-full" data-name="Mainline Carousel/Related News">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start pb-[4px] pt-[10px] px-[20px] relative w-full">
          <MainlineCarouselSlideBySlide />
        </div>
      </div>
    </div>
  );
}

function SectionTitlePropsInLeft2() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-[24px] min-w-px relative shrink-0" data-name="Section Title/Props in Left">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[22px] min-w-full overflow-ellipsis overflow-hidden relative shrink-0 text-[#111] text-[18px] text-nowrap w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Explore More News
      </p>
    </div>
  );
}

function SectionTitle2() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full" data-name="Section Title">
      <SectionTitlePropsInLeft2 />
    </div>
  );
}

function Placeholder13() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px overflow-clip relative shrink-0" data-name="Placeholder">
      <div className="absolute bg-[#ccc] inset-0" data-name="image" />
    </div>
  );
}

function AvatarFavContainer7() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[64px] shrink-0 size-[24px]" data-name="Avatar & Fav Container">
      <Placeholder13 />
    </div>
  );
}

function Circle() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Circle">
      <AvatarFavContainer7 />
    </div>
  );
}

function BaseButton() {
  return (
    <div className="bg-white relative rounded-[24px] shrink-0" data-name="Base Button">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip pl-[4px] pr-[16px] py-[4px] relative rounded-[inherit]">
        <Circle />
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[15.6px] relative shrink-0 text-[#111] text-[13px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Button Label
        </p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#ececec] border-solid inset-0 pointer-events-none rounded-[24px]" />
    </div>
  );
}

function MainlineGroupButton() {
  return (
    <div className="content-stretch flex gap-[6px] items-start overflow-clip px-0 py-[4px] relative shrink-0 w-[608px]" data-name="Mainline/Group Button">
      {[...Array(8).keys()].map((_, i) => (
        <BaseButton key={i} />
      ))}
    </div>
  );
}

function FadeRight1() {
  return <div className="absolute bottom-0 right-[-1px] top-[-3px] w-[24px]" data-name="fade right" style={{ backgroundImage: "linear-gradient(-90deg, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)" }} />;
}

function IconsChevronLeft3() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icons/Chevron-Left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_1_73355)" id="Icons/Chevron-Left">
          <path d={svgPaths.p39caf500} fill="var(--fill-0, #767676)" id="Shape" />
        </g>
        <defs>
          <clipPath id="clip0_1_73355">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IconContainer22() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-1/2 size-[14px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Icon Container">
      <IconsChevronLeft3 />
    </div>
  );
}

function BaseCircle4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0 size-[32px]" data-name="Base Circle">
      <div className="relative shrink-0 size-[32px]">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(255, 255, 255, 1)", "--stroke-0": "rgba(221, 221, 221, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <circle cx="16" cy="16" fill="var(--fill-0, white)" id="Ellipse 1" r="15.5" stroke="var(--stroke-0, #DDDDDD)" />
          </svg>
        </div>
      </div>
      <IconContainer22 />
    </div>
  );
}

function CarouselButtonsMainlineCarousel4() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-start left-[-16px] opacity-0 shadow-[0px_2px_3px_0px_rgba(0,0,0,0.1)] top-1/2 translate-y-[-50%]" data-name="Carousel Buttons/Mainline Carousel">
      <BaseCircle4 />
    </div>
  );
}

function IconsChevronRight3() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icons/Chevron-Right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_1_73613)" id="Icons/Chevron-Right">
          <path d={svgPaths.p2134100} fill="var(--fill-0, #767676)" id="Shape" />
        </g>
        <defs>
          <clipPath id="clip0_1_73613">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IconContainer23() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-1/2 size-[14px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Icon Container">
      <IconsChevronRight3 />
    </div>
  );
}

function BaseCircle5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0 size-[32px]" data-name="Base Circle">
      <div className="relative shrink-0 size-[32px]">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(255, 255, 255, 1)", "--stroke-0": "rgba(221, 221, 221, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <circle cx="16" cy="16" fill="var(--fill-0, white)" id="Ellipse 1" r="15.5" stroke="var(--stroke-0, #DDDDDD)" />
          </svg>
        </div>
      </div>
      <IconContainer23 />
    </div>
  );
}

function CarouselButtonsMainlineCarousel5() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-start right-[-14px] shadow-[0px_2px_3px_0px_rgba(0,0,0,0.1)] top-1/2 translate-y-[-50%]" data-name="Carousel Buttons/Mainline Carousel">
      <BaseCircle5 />
    </div>
  );
}

function CarouselContainer2() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0" data-name="Carousel Container">
      <MainlineGroupButton />
      <FadeRight1 />
      <CarouselButtonsMainlineCarousel4 />
      <CarouselButtonsMainlineCarousel5 />
    </div>
  );
}

function MainlineCarouselSildeToEnd1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[618px]" data-name="Mainline Carousel/Silde to end">
      <SectionTitle2 />
      <CarouselContainer2 />
    </div>
  );
}

function MainlineCarouselExploreMoreNews() {
  return (
    <div className="relative shrink-0 w-full" data-name="Mainline Carousel/Explore More News">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start pb-[4px] pt-[10px] px-[20px] relative w-full">
          <MainlineCarouselSildeToEnd1 />
        </div>
      </div>
    </div>
  );
}

function MainlineNewsLayoutDesktop() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full" data-name="Mainline News layout/Desktop">
      <MainlineCarouselRelatedNews />
      <MainlineCarouselExploreMoreNews />
    </div>
  );
}

function ComponentContainer1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Component Container">
      <MainlineNewsLayoutDesktop />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[6px] shrink-0 w-full" data-name="Container">
      <ComponentContainer1 />
    </div>
  );
}

function AnswerContainer3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Answer Container">
      <Container9 />
    </div>
  );
}

function NewsContent() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="News Content">
      <AnswerContainer3 />
    </div>
  );
}

function News() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] pt-0 px-0 relative shrink-0 w-full" data-name="News">
      <NewsContent />
    </div>
  );
}

function IconsSearch1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icons/Search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icons/Search">
          <path d={svgPaths.pbccfb00} fill="var(--fill-0, #666666)" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function LeftIcon11() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Left Icon">
      <IconsSearch1 />
    </div>
  );
}

function IconLabel16() {
  return (
    <div className="content-stretch flex gap-[16px] h-[22px] items-center overflow-clip relative shrink-0" data-name="Icon + Label">
      <LeftIcon11 />
    </div>
  );
}

function Link21() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="Link">
      <p className="basis-0 font-['Roboto:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#111] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Link title
      </p>
    </div>
  );
}

function ListItemCapsule() {
  return (
    <div className="bg-[#f9f9f9] relative rounded-[24px] shrink-0 w-full" data-name="List Item/Capsule">
      <div aria-hidden="true" className="absolute border border-[#f5f5f5] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[8px] relative w-full">
          <IconLabel16 />
          <Link21 />
        </div>
      </div>
    </div>
  );
}

function Capsule() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] pt-0 px-0 relative shrink-0 w-full" data-name="Capsule">
      <ListItemCapsule />
    </div>
  );
}

function IconsSearch2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icons/Search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icons/Search">
          <path d={svgPaths.pbccfb00} fill="var(--fill-0, #666666)" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function LeftIcon12() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Left Icon">
      <IconsSearch2 />
    </div>
  );
}

function IconLabel17() {
  return (
    <div className="content-stretch flex gap-[16px] h-[22px] items-center overflow-clip relative shrink-0" data-name="Icon + Label">
      <LeftIcon12 />
    </div>
  );
}

function Link22() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="Link">
      <p className="basis-0 font-['Roboto:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#111] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Link title
      </p>
    </div>
  );
}

function ListItemCapsule1() {
  return (
    <div className="bg-[#f9f9f9] relative rounded-[24px] shrink-0 w-full" data-name="List Item/Capsule">
      <div aria-hidden="true" className="absolute border border-[#f5f5f5] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[8px] relative w-full">
          <IconLabel17 />
          <Link22 />
        </div>
      </div>
    </div>
  );
}

function ListItem8() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pb-[8px] pt-0 px-0 relative shrink-0 w-full" data-name="List item 4">
      <ListItemCapsule1 />
    </div>
  );
}

function ListContainer2() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="List Container">
      <Capsule />
      <Capsule />
      <Capsule />
      <ListItem8 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      {[...Array(2).keys()].map((_, i) => (
        <ListContainer2 key={i} />
      ))}
    </div>
  );
}

function MainlineRelatedSearches() {
  return (
    <div className="relative shrink-0 w-full" data-name="Mainline Related Searches">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start pb-0 pt-[16px] px-[20px] relative w-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#444] text-[20px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Related searches for title
          </p>
          <Frame />
        </div>
      </div>
    </div>
  );
}

function Mainline() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[648px]" data-name="Mainline">
      <Algoblock />
      <PeopleAlsoAsk1 />
      <Algoblock1 />
      <Algoblock1 />
      <News />
      <Algoblock1 />
      <MainlineRelatedSearches />
    </div>
  );
}

function IconsSearch3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icons/Search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icons/Search">
          <path d={svgPaths.pbccfb00} fill="var(--fill-0, #666666)" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function LeftIcon13() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Left Icon">
      <IconsSearch3 />
    </div>
  );
}

function IconLabel18() {
  return (
    <div className="content-stretch flex gap-[16px] h-[22px] items-center overflow-clip relative shrink-0" data-name="Icon + Label">
      <LeftIcon13 />
    </div>
  );
}

function Link23() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="Link">
      <p className="basis-0 font-['Roboto:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#111] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Link title
      </p>
    </div>
  );
}

function ListItemCapsule2() {
  return (
    <div className="bg-[#f9f9f9] relative rounded-[24px] shrink-0 w-full" data-name="List Item/Capsule">
      <div aria-hidden="true" className="absolute border border-[#f5f5f5] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[8px] relative w-full">
          <IconLabel18 />
          <Link23 />
        </div>
      </div>
    </div>
  );
}

function Capsule1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] pt-0 px-0 relative shrink-0 w-full" data-name="Capsule">
      <ListItemCapsule2 />
    </div>
  );
}

function IconsSearch4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icons/Search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icons/Search">
          <path d={svgPaths.pbccfb00} fill="var(--fill-0, #666666)" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function LeftIcon14() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Left Icon">
      <IconsSearch4 />
    </div>
  );
}

function IconLabel19() {
  return (
    <div className="content-stretch flex gap-[16px] h-[22px] items-center overflow-clip relative shrink-0" data-name="Icon + Label">
      <LeftIcon14 />
    </div>
  );
}

function Link24() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="Link">
      <p className="basis-0 font-['Roboto:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#111] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Link title
      </p>
    </div>
  );
}

function ListItemCapsule3() {
  return (
    <div className="bg-[#f9f9f9] relative rounded-[24px] shrink-0 w-full" data-name="List Item/Capsule">
      <div aria-hidden="true" className="absolute border border-[#f5f5f5] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[8px] relative w-full">
          <IconLabel19 />
          <Link24 />
        </div>
      </div>
    </div>
  );
}

function ListItem9() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] pt-0 px-0 relative shrink-0 w-full" data-name="List item 2">
      <ListItemCapsule3 />
    </div>
  );
}

function IconsSearch5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icons/Search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icons/Search">
          <path d={svgPaths.pbccfb00} fill="var(--fill-0, #666666)" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function LeftIcon15() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Left Icon">
      <IconsSearch5 />
    </div>
  );
}

function IconLabel20() {
  return (
    <div className="content-stretch flex gap-[16px] h-[22px] items-center overflow-clip relative shrink-0" data-name="Icon + Label">
      <LeftIcon15 />
    </div>
  );
}

function Link25() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="Link">
      <p className="basis-0 font-['Roboto:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#111] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Link title
      </p>
    </div>
  );
}

function ListItemCapsule4() {
  return (
    <div className="bg-[#f9f9f9] relative rounded-[24px] shrink-0 w-full" data-name="List Item/Capsule">
      <div aria-hidden="true" className="absolute border border-[#f5f5f5] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[8px] relative w-full">
          <IconLabel20 />
          <Link25 />
        </div>
      </div>
    </div>
  );
}

function ListItem10() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pb-[8px] pt-0 px-0 relative shrink-0 w-full" data-name="List item 4">
      <ListItemCapsule4 />
    </div>
  );
}

function ListContainer3() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="List Container">
      <Capsule1 />
      <ListItem9 />
      <Capsule1 />
      <ListItem10 />
      <Capsule1 />
      <Capsule1 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full">
      <ListContainer3 />
    </div>
  );
}

function RightRailRelatedSearches() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Right-rail Related Searches">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#444] text-[20px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Related searches for title
      </p>
      <Frame1 />
    </div>
  );
}

function RightRail() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative self-stretch shrink-0 w-[472px]" data-name="Right-rail">
      <RightRailRelatedSearches />
    </div>
  );
}

function DemoBody() {
  return (
    <div className="content-stretch flex gap-[80px] items-start pl-[160px] pr-0 py-[12px] relative shrink-0 w-[1384px] z-[2]" data-name="Demo/Body">
      <Mainline />
      <RightRail />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0">
      <div className="bg-[#f9f9f9] h-[46px] relative rounded-[4px] shrink-0 w-[40px]">
        <div aria-hidden="true" className="absolute border border-[#ddd] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
      <div className="bg-[#f9f9f9] h-[46px] relative rounded-[4px] shrink-0 w-[40px]">
        <div aria-hidden="true" className="absolute border border-[#ddd] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
      <div className="bg-[#f9f9f9] h-[46px] relative rounded-[4px] shrink-0 w-[40px]">
        <div aria-hidden="true" className="absolute border border-[#ddd] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
      <div className="bg-[#f9f9f9] h-[46px] relative rounded-[4px] shrink-0 w-[40px]">
        <div aria-hidden="true" className="absolute border border-[#ddd] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
      <div className="bg-[#f9f9f9] h-[46px] relative rounded-[4px] shrink-0 w-[40px]">
        <div aria-hidden="true" className="absolute border border-[#ddd] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
      <div className="bg-[#f9f9f9] h-[46px] relative rounded-[4px] shrink-0 w-[40px]">
        <div aria-hidden="true" className="absolute border border-[#ddd] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
      <div className="bg-[#f9f9f9] h-[46px] relative rounded-[4px] shrink-0 w-[40px]">
        <div aria-hidden="true" className="absolute border border-[#ddd] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex gap-[40px] items-center pl-[160px] pr-0 py-0 relative shrink-0">
      <Frame19 />
      <div className="bg-[#f9f9f9] h-[32px] relative rounded-[999px] shrink-0 w-[80px]">
        <div aria-hidden="true" className="absolute border border-[#ddd] border-solid inset-0 pointer-events-none rounded-[999px]" />
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
      <div className="bg-[#f9f9f9] h-[16px] relative rounded-[6px] shrink-0 w-[158px]">
        <div aria-hidden="true" className="absolute border border-[#ddd] border-solid inset-0 pointer-events-none rounded-[6px]" />
      </div>
      <div className="bg-[#f9f9f9] h-[16px] relative rounded-[6px] shrink-0 w-[60px]">
        <div aria-hidden="true" className="absolute border border-[#ddd] border-solid inset-0 pointer-events-none rounded-[6px]" />
      </div>
      <div className="bg-[#f9f9f9] h-[16px] relative rounded-[6px] shrink-0 w-[220px]">
        <div aria-hidden="true" className="absolute border border-[#ddd] border-solid inset-0 pointer-events-none rounded-[6px]" />
      </div>
      <div className="bg-[#f9f9f9] h-[16px] relative rounded-[6px] shrink-0 w-[180px]">
        <div aria-hidden="true" className="absolute border border-[#ddd] border-solid inset-0 pointer-events-none rounded-[6px]" />
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="bg-[#f9f9f9] relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[160px] py-[12px] relative w-full">
          <Frame20 />
          <div className="bg-[#f9f9f9] h-[16px] relative rounded-[6px] shrink-0 w-[180px]">
            <div aria-hidden="true" className="absolute border border-[#ddd] border-solid inset-0 pointer-events-none rounded-[6px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SkeletonFooter() {
  return (
    <div className="content-stretch flex flex-col gap-[46px] items-start pb-0 pt-[24px] px-0 relative shrink-0 w-full z-[1]" data-name="Skeleton/Footer">
      <Frame11 />
      <Frame10 />
    </div>
  );
}

export default function Serp() {
  return (
    <div className="bg-white relative rounded-[20px] size-full" data-name="SERP">
      <div className="content-stretch flex flex-col gap-[16px] isolate items-start overflow-clip relative rounded-[inherit] size-full">
        <Header />
        <PoleCarouselPortraits />
        <DemoBody />
        <SkeletonFooter />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ddd] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}