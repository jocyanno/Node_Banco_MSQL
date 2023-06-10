import { Request, Response } from 'express';

import { Product } from '../models/Product';
import { User } from '../models/User';
import { Op } from 'sequelize';

export const home = async (req: Request, res: Response)=>{



    /* let results = await User.findAll({ where: { name: 'Ciclano'}});
    if(results.length >0) {
        let usuario = results[0];

        await usuario.destroy();
    }
    */

    /* await User.destroy({
        where: {
            age: {
                [Op.lte]: 18
            }
        }
    });
    */ 

    /* let results = await User.findAll({ where: { id: 7}});
    if(results.length > 0){
        let usuario = results[0];

        usuario.name = 'testador';
        usuario.age = 18;

        await usuario.save();
    }
    */

    /* await User.update({ age: 18 }, {
        where: { 
            age: {
                [Op.lt]: 18
            }
        }
    });
    */
    
    //create
    /* const user = await User.create({
        name: 'Ciclano',
        age: 39
    }); */
    
    // build + save
    /* let user = User.build({
        name: 'Fulaninho',
        age: 25
    });

    // fiz alguma coisa

    let idade = 95;
    user.age = idade;

    await user.save();

    console.log("Nome", user.name);
    console.log("Idade: ", user.age);
    */

    /* let searchName : string = 'jocy';

    let users = await User.findAll({
        
        // GT = Greater Than
        // E = Equal
        // LT = Lower than


        where: {
            age: {
                [Op.gt]: 40, // > 40
                [Op.gte]: 40, // >= 40
                [Op.lt]: 40, // < 40
                [Op.lte]: 40, // <= 40
                [Op.between]: [40, 70], // entre 40 e 70
                [Op.in] : [40, 80], // escolher esses valores
                [Op.notIn] : [40, 80], // não pega esses valores
                [Op.like] : `%${searchName} %` // nome de busca sem digitar completamente
            },
            order: [ 'name'],
            offset: 1, // pule tantos intens
            limit: 2, 
            // order: [ 'name', 'DESC'] 
        }
    }); */


        /* let users = await User.findAll({
        where: {
            [Op.or]: [
                {age: 90},
                {age: 19}
            ]
        }
    });
    */

    /*let users = await User.findAll({
        where: { name : 'JOCYANNO'}
    });*/

    // let users = await User.findAll({
    //    attributes: ['name',['age', 'idade']] });
    
    
    let users = await User.findAll();
    // console.log("Usuários: ", JSON.stringify(users));


    
    let age: number = 90;
    let showOld: boolean = false;

    if(age > 50) {
        showOld = true;
    }

    let list = Product.getAll();
    let expensiveList = Product.getFromPriceAfter(12);

    res.render('pages/home', {
        name: 'Bonieky',
        lastName: 'Lacerda',
        showOld,
        products: list,
        expensives: expensiveList,
        frasesDoDia: [], 
        users
    });
};

export const novoUsuario = async (req: Request, res: Response) => {
    let { name, age } = req.body;

    if(name) {
        const newUser = User.build({ name });

        if(age) {
            newUser.age = parseInt(age);
        }

        await newUser.save();
    }

    res.redirect('/');
};