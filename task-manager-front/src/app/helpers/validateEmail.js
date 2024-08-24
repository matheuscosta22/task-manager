export function validateEmail(email) {
    const rgx =
        // First section of email(before @) rejects [^´`<>{}()[\]\\,;:'~"+*?!|/%#^\s@"$&!=@\u00C0-\u00FF]+@
        // Second section of email(after @ before .com) rejects [^´`<>{}()[\]\\.,;:'"+?!|/%#^\s@"$&!=@\u00C0-\u00FF]+
        // Third section of email(after .) rejects \.[^´`<>{}()[\]\\.,;:'`"+?!|/%#^\s@"$&!=@\u00C0-\u00FF1-9]{2,}
        // Fourth section of email(after .com || not required) rejects (\.[^´`<>{}()[\]\\.,;:'`"+?!|/%#^\s@"$&!=@\u00C0-\u00FF1-9]{2})?
        /^[^´`<>{}()[\]\\,;:'~"+*?!|/%#^\s@"$&!=@\u00C0-\u00FF]+@[^´`<>{}()[\]\\.,;:'"+?!|/%#^\s@"$&!=@\u00C0-\u00FF]+\.[^´`<>{}()[\]\\.,;:'`"+?!|/%#^\s@"$&!=@\u00C0-\u00FF1-9]{2,}(\.[^´`<>{}()[\]\\.,;:'`"+?!|/%#^\s@"$&!=@\u00C0-\u00FF1-9]{2,})?(\.[^´`<>{}()[\]\\.,;:'`"+?!|/%#^\s@"$&!=@\u00C0-\u00FF1-9]{2})?$/;
    return rgx.test(email);
}