const product = 
{

        prodDB : [],

        init()
        {
            this.prodDB.push({img:'img/forrent-1.jpg',title:'Room for rent', desc:'Sunny bedroom room for rent', rate:`649.99`});

            this.prodDB.push({img:'img/forrent-2.jpg',title:'House for rent',desc:'Tuscan-inspired house for rent',rate:`749.99`});
        
            this.prodDB.push({img:'img/forrent-3.jpg',title:'Rooms for rent',desc:'Chic 3-bedroom house for rent',rate:`849.99`});
        
            this.prodDB.push({img:'img/forrent-4.jpg',title:'Tree house for rent',desc:'Treehouse in the jungle for rent',rate:`949.99`});
        
            this.prodDB.push({img:'img/forrent-5.jpg',title:'Room for rent',desc:'Quaint room in the city for rent',rate:`1049.99`});
        
            this.prodDB.push({img:'img/forrent-6.jpg',title:'Room for rent',desc:'Castle-like room for rent',rate:`1149.99`});
        },

        getAllProducts()
        {
            return this.prodDB;
        },


}

product.init();
module.exports = product;