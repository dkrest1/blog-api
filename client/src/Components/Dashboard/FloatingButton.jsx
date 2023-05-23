import { IconButton, SpeedDial, SpeedDialHandler, SpeedDialContent, SpeedDialAction, Typography,
  } from "@material-tailwind/react";
  import {PlusIcon, PencilSquareIcon,Square3Stack3DIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
   
  const FloatingButton =()=> {
    const labelProps = {
      variant: "small",
      color: "blue-gray",
      className:
        "absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal font-bold ",
    };
   
    return (
      <div className="relative h80 w-full ">
        <div className="fixed bottom-10 right-3">
          <SpeedDial className="">
            <SpeedDialHandler>
              <IconButton size="lg" className="rounded-full">
                <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
              </IconButton>
            </SpeedDialHandler>
            <SpeedDialContent className='bg-blac'>
              <SpeedDialAction className="relative">
                <PhotoIcon className="h-5 w-5" />
                <Typography {...labelProps}>Photos</Typography>
              </SpeedDialAction>
              <SpeedDialAction className="relative">
              <NavLink to='/write'>
                <PencilSquareIcon className="h-5 w-5" />
                <Typography {...labelProps}>Publish</Typography>
                </NavLink>
              </SpeedDialAction>
              <SpeedDialAction className="relative">
                <Square3Stack3DIcon className="h-5 w-5" />
                <Typography {...labelProps}>My Stories</Typography>
              </SpeedDialAction>
            </SpeedDialContent>
          </SpeedDial>
        </div>
      </div>
    );
  }

  export default FloatingButton;