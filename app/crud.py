from sqlalchemy.orm import Session
from app import models
from datetime import datetime
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# --- Події ---
def create_event(db: Session, title: str, description: str, date: datetime, type: str = None):
    db_event = models.Event(title=title, description=description, date=date, type=type)
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

def get_events(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Event).offset(skip).limit(limit).all()

# --- Гравці ---
def create_player(db: Session, username: str, email: str, password: str):
    hashed_password = pwd_context.hash(password)
    db_player = models.Player(username=username, email=email, password_hash=hashed_password)
    db.add(db_player)
    db.commit()
    db.refresh(db_player)
    return db_player

def get_players(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Player).offset(skip).limit(limit).all()

# --- Медіа ---
def create_media(db: Session, filename: str, file_type: str, url: str, description: str = None):
    db_media = models.Media(filename=filename, file_type=file_type, url=url, description=description)
    db.add(db_media)
    db.commit()
    db.refresh(db_media)
    return db_media

def get_media(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Media).offset(skip).limit(limit).all()

# --- Правила ---
def create_rule(db: Session, title: str, description: str = None, pdf_filename: str = None, image_filename: str = None):
    db_rule = models.Rule(title=title, description=description, pdf_filename=pdf_filename, image_filename=image_filename)
    db.add(db_rule)
    db.commit()
    db.refresh(db_rule)
    return db_rule

def get_rules(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Rule).offset(skip).limit(limit).all()

# --- Картки ---
def create_card(db: Session, id: str, name: str, description: str, quantity: int, team: str, img: str = None):
    db_card = models.Card(id=id, name=name, description=description, quantity=quantity, team=team, img=img)
    db.add(db_card)
    db.commit()
    db.refresh(db_card)
    return db_card

def get_cards(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Card).offset(skip).limit(limit).all()
