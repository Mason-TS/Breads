export class User {
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    state?: string;
    bio?: string;
    gender?: boolean;

    constructor(username?: string, password?: string, firstName?: string,
         lastName?: string, city?: string, state?: string,  bio?: string, gender?: boolean) {

            this.username = username;
            this.password = password;
            this.firstName = firstName;
            this.lastName = lastName;
            this.city = city ?? "";
            this.state = state ?? "";
            this.bio = bio ?? "";
            this.gender = gender ?? undefined;
    }
}
