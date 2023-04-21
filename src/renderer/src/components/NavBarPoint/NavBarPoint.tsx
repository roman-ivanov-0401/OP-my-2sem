import { FC } from "react";
import { Link } from "react-router-dom";

import { Button } from "@mui/material";
import { NavBarPointProps } from "./navBarPoint.interface";

import styles from "./navBarPoint.module.scss"

const NavBarPoint: FC<NavBarPointProps> = ({ name, path }) => {
    return (
        <Button>
            <Link to={path} className={styles.navLink}>
                    {name}
            </Link>
        </Button>
    );
};

export { NavBarPoint };
