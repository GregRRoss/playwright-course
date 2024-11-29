export const adminDetails = {
    username: "admin",
    password: process.env.ADMIN_PASSWORD,  // This only works using git bash "ADMIN_PASSWORD=Admin123 npm test" without npm install dotenv
                                           // Does not work with Windows cmd.exe or Visual Studio Code terminal on Windows.
}

