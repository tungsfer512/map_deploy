from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Double
from sqlalchemy.orm import relationship

from database import Base


class Bins(Base):
    __tablename__ = "bins"

    id = Column(Integer, primary_key=True, index=True)
    weight = Column(Double, index=True)
    unit = Column(String, default="gram")


class Vehicles(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True, index=True)
    lat = Column(Double, index=True)
    lng = Column(Double, index=True)