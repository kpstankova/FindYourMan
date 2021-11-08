import { Role } from '../models/bom/Role';
import User from '../models/User';

class UserVerificationService {
    contructor() { }

    public verifyName(name: string) {
        if (!name)
            return;

        let regex = new RegExp(/^[a-zA-Zа-яА-Я]+(([',. -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/);
        let names = name.split(' ');
        let flag = true;
        names.forEach(el => {
            if (!regex.test(el))
                flag = false;
        })

        return flag;
    }

    public verifyEmail(email: string) {
        if (!email)
            return;
        var regex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return regex.test(email);
    }

    public verifyPassword(pass: string) {
        if (!pass)
            return;
        // Requires one lower case letter, 
        // one upper case letter, one digit, 6-13 length, and no spaces. 
        const regex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,32}$/);
        return regex.test(pass);
    }

    public verifyRole(role: string) {
        if (!role)
            return;
        return role == Role.INDIVIDUAL || role == Role.CORPORATE || role == Role.FREELANCER;
    }

    public verifyPhone(phone: string) {
        if (!phone)
            return;
        let regex = new RegExp(/^[0-9]{10}$/);
        return regex.test(phone);
    }

    public verifyAddress(address: string) {
        if (!address)
            return;
        let regex = new RegExp(/^[a-zA-Zа-яА-Я0-9№. "-]{5,}$/);
        return regex.test(address);
    }

    public verifyBulstat(vat: string) {
        if (!vat)
            return false;
        let regex = new RegExp(/^[0-9]{9}$/);
        return regex.test(vat);
    }

    public verifyRequiredFields(user: User) {
        let result = this.verifyEmail(user.email) && this.verifyPassword(user.password) && this.verifyRole(user.role);
        if (user.role === Role.CORPORATE) {
            result &&= this.verifyBulstat(user.vat)
        }
        else if (user.vat)
            result &&= false;
        return result;
    }

    public verifyOptionalFileds(user: User) {
        let resultMap = new Map();
        let result = true;
        let message = "";

        let midResult = true;
        if (user.name) {
            midResult = this.verifyName(user.name);
            if (!midResult)
                message += "Invalid name.\n";
            result &&= midResult
        }

        if (user.phone) {
            midResult = this.verifyPhone(user.phone);
            if (!midResult)
                message += "Invalid phone.\n";
            result &&= midResult
        }

        if (user.address) {
            midResult = this.verifyAddress(user.address);
            if (!midResult)
                message += "Invalid address.\n";
            result &&= midResult
        }

        resultMap.set(result, message);
        return resultMap;
    }

    public verifyNewUser(user: any) {
        if (!user)
            return "User is null";
        let stringRejection = "";

        if (!this.verifyRequiredFields(user)) {
            stringRejection = "Invalid required fields: email or password (or vat if corporate user).\n";
        }

        let optionalResult = this.verifyOptionalFileds(user);
        if (optionalResult.has(false)) {
            stringRejection += optionalResult.get(false);
        }

        return stringRejection;
    }

}
export default new UserVerificationService();