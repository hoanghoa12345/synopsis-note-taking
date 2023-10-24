
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Error = () => {
  return ( 
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <img
        src="https://illustrations.popsy.co/amber/crashed-error.svg"
        height="300"
        width="300"
        alt="popsy.co"
        className="dark:invert dark:grayscale"
      />
      <h2 className="text-xl font-medium">
        Something went wrong!
      </h2>
      <Button asChild>
        <Link to="/documents">
          Go back
        </Link>
      </Button>
    </div>
  );
}
 
export default Error;