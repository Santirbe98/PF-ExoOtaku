import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";

    const AcountButton = () => {

        const history = useHistory();
        const routeChange = () =>{ 
            history.push("/acount");
        }
        return (
        
            <Button
                color="warning"
                size="medium"
                variant="outlined"
                sx={{ width: 150, padding: 1, margin: 0.5 }}
                onClick={routeChange}
            >
                Mi Cuenta
            </Button> 
        )
    };

export default AcountButton;