class User {
    

    constructor(public id: number,public firstName:string, public middleName :string, public lastName:string,public email:string,
        public phone: string,public role: string, public address: string,public customer: string,public created_on: string, public modified_on: string)
    {
 
    }
 }

export { User};