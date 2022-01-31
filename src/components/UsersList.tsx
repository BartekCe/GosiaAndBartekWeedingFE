import React, {useEffect, useState} from "react";
import {User} from "../fetches/interfaces";
import UserSheet from "./UserSheet";

const UsersList = () => {

    const [users, setUsers] = useState<User[]>([]);

    const fetchUsersHandler = async () => {
        let url = 'http://localhost:8080/getUsers';
    const response = await fetch(url);
    const data = await response.json();

    const transformedUsers = data.map((user:User) => {
        return {
            id:user.id,
            name: user.name,
            startingWeight: user.startingWeight,
            currentWeight: user.currentWeight,
            goalWeight: user.goalWeight,
            weeklyCaloriesIntake: user.weeklyCaloriesIntake,
            dailyCaloriesIntake: user.dailyCaloriesIntake,
            dailyProtein: user.dailyProtein,
            dailyFat: user.dailyFat,
            dailyCarbohydrate: user.dailyCarbohydrate
        };
    })
        setUsers(transformedUsers);
    }

    useEffect(() => {
        fetchUsersHandler();
    },[])

    return <div>
        {users.map((user, index) =>
            <UserSheet
                key={index}
                id={user.id}
                name={user.name}
                startingWeight={user.startingWeight}
                currentWeight={user.currentWeight}
                goalWeight={user.goalWeight}
                weeklyCaloriesIntake={user.weeklyCaloriesIntake}
                dailyCaloriesIntake={user.dailyCaloriesIntake}
                dailyProtein={user.dailyProtein}
                dailyFat={user.dailyFat}
                dailyCarbohydrate={user.dailyCarbohydrate}
            />
        )}
    </div>
}

export default UsersList;