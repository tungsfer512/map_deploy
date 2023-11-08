const { DataTypes, Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const db_conf = {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: false,
}

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    db_conf
);

const ADM_Vehicle = sequelize.define(
    'adm_vehicle',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        code: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        engineHours: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        engineId: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        engineType: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        model: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        height: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        length: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        width: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        odometer: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        plate: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        tonnage: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        image: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        status: {
            type: DataTypes.TEXT,
            allowNullL: true,
        }, 
        camera: {
            type: DataTypes.TEXT,
            allowNullL: true,
        }
    },
    {
        tableName: 'adm_vehicle',
        timestamps: true
    }
);

const ADM_User = sequelize.define(
    'adm_user',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        phone: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        password: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        email: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        firstName: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        lastName: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        gender: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        dob: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        image: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        role: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        status: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        companyId: {
            type: DataTypes.INTEGER,
            allowNullL: true,
            references: {
                model: 'adm_company',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
    },
    {
        tableName: 'adm_user',
        timestamps: true
    }
);

const ADM_Company = sequelize.define(
    'adm_company',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        email: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        phone: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        image: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        address: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        status: {
            type: DataTypes.TEXT,
            allowNullL: true,
        }
    },
    {
        tableName: 'adm_company',
        timestamps: true
    }
);

const ADM_Bin = sequelize.define(
    'adm_bin',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        latitude: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        address: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        height: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        length: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        width: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        weight: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        maxWeight: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        color: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        material: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        brand: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        code: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        image: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        status: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        camera1: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        camera2: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        camera3: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
    },
    {
        tableName: 'adm_bin',
        timestamps: true
    }
);

const ADM_Task = sequelize.define(
    'adm_task',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        driverId: {
            type: DataTypes.INTEGER,
            allowNullL: true,
            references: {
                model: 'adm_user',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        vehicleId: {
            type: DataTypes.INTEGER,
            allowNullL: true,
            references: {
                model: 'adm_vehicle',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        companyId: {
            type: DataTypes.INTEGER,
            allowNullL: true,
            references: {
                model: 'adm_company',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        description: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        status: {
            type: DataTypes.TEXT,
            allowNullL: true,
        }
    },
    {
        tableName: 'adm_task',
        timestamps: true
    }
);

const ADM_Bin_Company = sequelize.define(
    'adm_bin_company',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        binId: {
            type: DataTypes.INTEGER,
            allowNullL: true,
            references: {
                model: 'adm_bin',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        companyId: {
            type: DataTypes.INTEGER,
            allowNullL: true,
            references: {
                model: 'adm_company',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        description: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        status: {
            type: DataTypes.TEXT,
            allowNullL: true,
        }
    },
    {
        tableName: 'adm_bin_company',
        timestamps: true
    }
);

const LOG_Bin_State = sequelize.define(
    'log_bin_state',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        latitude: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        weight: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        status: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        binId: {
            type: DataTypes.INTEGER,
            allowNullL: true,
            references: {
                model: 'adm_bin',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        }
    },
    {
        tableName: 'log_bin_state',
        timestamps: true
    }
);

const LOG_Vehicle_Work = sequelize.define(
    'log_vehicle_work',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        latitude: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        altitude: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        speed: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        angle: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        odometer: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        engineHours: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        fuel: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        status: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        vehicleId: {
            type: DataTypes.INTEGER,
            allowNullL: true,
            references: {
                model: 'adm_vehicle',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        driverId: {
            type: DataTypes.INTEGER,
            allowNullL: true,
            references: {
                model: 'adm_user',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        binStateId: {
            type: DataTypes.INTEGER,
            allowNullL: true,
            references: {
                model: 'log_bin_state',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        }
    },
    {
        tableName: 'log_vehicle_work',
        timestamps: true
    }
);

const SUP_Vehicle_State = sequelize.define(
    'sup_vehicle_state',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        latitude: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        altitude: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        speed: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        angle: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        state: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        status: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        vehicleId: {
            type: DataTypes.INTEGER,
            allowNullL: true,
            references: {
                model: 'adm_vehicle',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        driverId: {
            type: DataTypes.INTEGER,
            allowNullL: true,
            references: {
                model: 'adm_user',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        }
    },
    {
        tableName: 'sup_vehicle_state',
        timestamps: true
    }
);

const SUP_Vehicle_Position = sequelize.define(
    'sup_vehicle_position',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        latitude: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        vehicleId: {
            type: DataTypes.INTEGER,
            allowNullL: true,
            references: {
                model: 'adm_vehicle',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
    },
    {
        tableName: 'sup_vehicle_position',
        timestamps: true
    }
);

const SUP_Vehicle_Trouble = sequelize.define(
    'sup_vehicle_trouble',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        latitude: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        altitude: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        speed: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        angle: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        fuel: {
            type: DataTypes.DOUBLE,
            allowNullL: true,
        },
        trouble: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        status: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        vehicleId: {
            type: DataTypes.INTEGER,
            allowNullL: true,
            references: {
                model: 'adm_vehicle',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        driverId: {
            type: DataTypes.INTEGER,
            allowNullL: true,
            references: {
                model: 'adm_user',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        }
    },
    {
        tableName: 'sup_vehicle_trouble',
        timestamps: true
    }
);

const VALID_Vehicle = sequelize.define(
    'valid_vehicle',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        latitude: {
            type: DataTypes.DOUBLE, 
            allowNull: true
        },
        longitude: {
            type: DataTypes.DOUBLE, 
            allowNull: true
        },
        plate: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        model: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        status: {
            type: DataTypes.TEXT,
            allowNullL: true,
        },
        binId: {
            type: DataTypes.INTEGER,
            allowNullL: true,
            references: {
                model: 'adm_bin',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        }
    },
    {
        tableName: 'valid_vehicle',
        timestamps: true
    }
);

async function createDB() {
    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');
}

module.exports = {
    createDB,
    ADM_Vehicle,
    ADM_User,
    ADM_Company,
    ADM_Bin,
    ADM_Task,
    ADM_Bin_Company,
    LOG_Bin_State,
    LOG_Vehicle_Work,
    SUP_Vehicle_State,
    SUP_Vehicle_Position,
    SUP_Vehicle_Trouble,
    VALID_Vehicle
};
