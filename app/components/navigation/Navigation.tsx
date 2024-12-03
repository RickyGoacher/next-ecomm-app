"use client";

import { useCategories } from "@/app/data/getCategories";
import classes from "./style.module.css";
import Link from "next/link";

const Navigation = () => {

    const { isPending, data: categories, error: categoryError, isSuccess } = useCategories();

    if(isPending) {
        return (
            <>
                <p>Loading...</p>
            </>
        );
    }

    if (categoryError) return categoryError.message;

    if(categories && isSuccess) {
        return (
            <nav className={classes["navigation"]}>
                <ul className={classes["navigation-list"]}>
                    {categories.map(category => {
                        return (
                            <li className={classes["navigation-item"]} key={category}><Link className={classes["navigation-link"]} href={'/category/' + category.replace(/[^\w\s]/gi, '').split(' ').join('-')}>{category}</Link></li>
                        );
                    })}
                </ul>
            </nav>
        );
    }
}

export default Navigation;