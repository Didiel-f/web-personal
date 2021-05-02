const Menu = require("../models/menu");

const addMenu = ( req, res ) => {
    const { title, url, order, active } = req.body;
    const menu = new Menu();
    menu.title = title;
    menu.url = url;
    menu.order = order;
    menu.active = active;

    menu.save( ( err, createdMenu ) => {
        if ( err ) {
            res.status(500).send({ message: "Error del servidor." })
        } else {
            if ( !createdMenu ) {
                res.status(404).send({ message: "Error al  crear el menu." });
            } else {
                res.status(200).send({ message: "Menu creado correctamente" })
            }
        }
    } );
    
};

const getMenus = ( req, res ) => {

    Menu.find()
        .sort({ order: "asc" })
        .exec( ( err, menusStored ) => {
            if ( err ) {
                res.status(500).send({ message: "Error del servidor." })
            } else {
                if ( !menusStored ) {
                    res.status(404).send({ message: "No se ha encontrado ningún menú." })
                } else {
                    res.status(200).send({ menu: menusStored })
                }
            }
        } );
    
};

const updateMenu = ( req, res ) => {
    let menuData = req.body;
    const params = req.params;
    
    Menu.findByIdAndUpdate( params.id, menuData, ( err, menuUpdate ) => {
        if (err) {
            res.status(500).send({ message: "Error del servidor." });
        } else {
            if ( !menuUpdate ) {
                res.status(404).send({ message: "No se ha encontrado ningún menu." });
            } else {
                res.status(200).send({ message: "Menu actualizado correctamente." });
            }
        }
    } )
};

const activateMenu = ( req, res ) => {
    const { id } = req.params;
    const { active } = req.body;

    Menu.findByIdAndUpdate( id, { active }, ( err, menuStored ) => {
        if (err) {
            res.status(500).send({ message: "Error del servidor." });
        } else {
            if ( !menuStored ) {
                res.status(404).send({ message: "No se ha encontrado el menu." });
            } else {
                if ( active === true ) {
                    res.status(200).send({ message: "Menu activado correctamente." });
                } else {
                    res.status(200).send({ message: "Menu desactivado correctamente." });

                }
            }
        }
    } )
};

module.exports = {
    addMenu,
    getMenus,
    updateMenu,
    activateMenu
};