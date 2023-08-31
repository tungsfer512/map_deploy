from sqlalchemy.orm import Session

import models, schemas


def get_bin_by_id(db: Session, id: int):
    return db.query(models.Bins).filter(models.Bins.id == id).first()

def get_tracking(db: Session):
    return db.query(models.Vehicles).filter(models.Vehicles.id == 1).first()

def create_bin(db: Session, bin: schemas.BinsCreate):
    db_bin = models.Bins(weight=bin.weight)
    db.add(db_bin)
    db.commit()
    db.refresh(db_bin)
    return db_bin

def create_vehicle(db: Session, vehicle: schemas.VehiclesCreate):
    db_vehicle = models.Vehicles(lat=vehicle.lat, lng=vehicle.lng)
    db.add(db_vehicle)
    db.commit()
    db.refresh(db_vehicle)
    return db_vehicle

def update_bin(db: Session, bin: schemas.BinsCreate, id: int):
    db_bin = db.query(models.Bins).filter(models.Bins.id == id).first()
    db_bin.weight = bin.weight
    db.commit()
    db.refresh(db_bin)
    return db_bin

def update_vehicle(db: Session, vehicle: schemas.VehiclesCreate):
    db_vehicle = db.query(models.Vehicles).filter(models.Vehicles.id == 1).first()
    db_vehicle.lat = vehicle.lat
    db_vehicle.lng = vehicle.lng
    db.commit()
    db.refresh(db_vehicle)
    return db_vehicle