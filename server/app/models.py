from sqlalchemy import Column, Integer, String, Text, TIMESTAMP
from sqlalchemy.sql import func
from .database import Base

# Події клубу
class Event(Base):
    __tablename__ = "events"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    date = Column(TIMESTAMP, default=func.now())
    type = Column(String(50), nullable=True)
    imgUrl = Column(String(255), nullable=True)


# Гравці клубу
class Player(Base):
    __tablename__ = "players"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    avatarUrl = Column(String(255), nullable=True)
    role = Column(String(50), nullable=True)
    created_at = Column(TIMESTAMP, default=func.now())
# Медіа
class Media(Base):
    __tablename__ = "media"
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255), nullable=False)
    file_type = Column(String(50), nullable=False)
    url = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    uploaded_at = Column(TIMESTAMP, default=func.now())

# Ролі / правила
class Rule(Base):
    __tablename__ = "rules"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    pdf_filename = Column(String(255), nullable=True)
    image_filename = Column(String(255), nullable=True)
    created_at = Column(TIMESTAMP, default=func.now())

# Картки ролей
class Card(Base):
    __tablename__ = "cards"
    id = Column(String(50), primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    quantity = Column(Integer, nullable=False)
    team = Column(String(50), nullable=False)
    imgUrl = Column(String(255), nullable=True)
