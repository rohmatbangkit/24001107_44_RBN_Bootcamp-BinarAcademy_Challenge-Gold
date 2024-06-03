function checkDrugData(req, res, next) {
    const { Stock, Price } = req.body;

    if (Stock < 0 || Price < 0) {
        return res.status(400).json({ message: 'Stock and Price cannot be negative' });
    }



    next();
}

module.exports = checkDrugData;
