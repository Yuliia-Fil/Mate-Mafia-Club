from sqlalchemy.orm import Session
from app import models
from datetime import datetime
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# --- Події ---
def create_event(db: Session, title: str, description: str, date: datetime, type: str, imgUrl: str):
    db_event = models.Event(title=title, description=description, date=date, type=type, imgUrl=imgUrl)
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

def get_events(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Event).offset(skip).limit(limit).all()

def get_event(db: Session, event_id: int):
    return db.query(models.Event).filter(models.Event.id == event_id).first()

# --- Оновлення події ---
def update_event(db: Session, event_id: int, title: str, description: str, date: datetime, type: str, imgUrl: str):
    event = db.query(models.Event).filter(models.Event.id == event_id).first()
    if not event:
        return None
    if title:
        event.title = title
    if description:
        event.description = description
    if date:
        event.date = date
    if type:
        event.type = type
    if imgUrl:
        event.imgUrl = imgUrl
    db.commit()
    db.refresh(event)
    return event

# --- Видалення події ---
def delete_event(db: Session, event_id: int):
    event = db.query(models.Event).filter(models.Event.id == event_id).first()
    if not event:
        return None
    db.delete(event)
    db.commit()
    return event

# --- Гравці ---
def create_player(db: Session, username: str, email: str, password: str, avatarUrl: str = None, role: str = None):
    hashed_password = pwd_context.hash(password)
    db_player = models.Player(
        username=username,
        email=email,
        password_hash=hashed_password,
        avatarUrl=avatarUrl,
        role=role
    )
    db.add(db_player)
    db.commit()
    db.refresh(db_player)
    return db_player

def get_players(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Player).offset(skip).limit(limit).all()

def get_player(db: Session, player_id: int):
    return db.query(models.Player).filter(models.Player.id == player_id).first()

def update_player(db: Session, player_id: int, username: str = None, email: str = None,
                  password: str = None, avatarUrl: str = None, role: str = None):
    player = db.query(models.Player).filter(models.Player.id == player_id).first()
    if not player:
        return None
    if username: player.username = username
    if email: player.email = email
    if password: player.password_hash = pwd_context.hash(password)
    if avatarUrl: player.avatarUrl = avatarUrl
    if role: player.role = role
    db.commit()
    db.refresh(player)
    return player

def delete_player(db: Session, player_id: int):
    player = db.query(models.Player).filter(models.Player.id == player_id).first()
    if not player:
        return None
    db.delete(player)
    db.commit()
    return player

# --- Медіа ---
def create_media(db: Session, filename: str, file_type: str, url: str, description: str = None):
    db_media = models.Media(filename=filename, file_type=file_type, url=url, description=description)
    db.add(db_media)
    db.commit()
    db.refresh(db_media)
    return db_media

def get_media(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Media).offset(skip).limit(limit).all()

def get_media_item(db: Session, media_id: int):
    return db.query(models.Media).filter(models.Media.id == media_id).first()

def update_media(db: Session, media_id: int, filename: str = None, file_type: str = None, url: str = None, description: str = None):
    media = db.query(models.Media).filter(models.Media.id == media_id).first()
    if not media:
        return None
    if filename:
        media.filename = filename
    if file_type:
        media.file_type = file_type
    if url:
        media.url = url
    if description:
        media.description = description
    db.commit()
    db.refresh(media)
    return media

def delete_media(db: Session, media_id: int):
    media = db.query(models.Media).filter(models.Media.id == media_id).first()
    if not media:
        return None
    db.delete(media)
    db.commit()
    return media

# --- Правила ---
def create_rule(db: Session, title: str, description: str = None, pdf_filename: str = None, image_filename: str = None):
    db_rule = models.Rule(title=title, description=description, pdf_filename=pdf_filename, image_filename=image_filename)
    db.add(db_rule)
    db.commit()
    db.refresh(db_rule)
    return db_rule

def get_rules(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Rule).offset(skip).limit(limit).all()

def get_rule(db: Session, rule_id: int):
    return db.query(models.Rule).filter(models.Rule.id == rule_id).first()

def update_rule(db: Session, rule_id: int, title: str = None, description: str = None, pdf_filename: str = None, image_filename: str = None):
    rule = db.query(models.Rule).filter(models.Rule.id == rule_id).first()
    if not rule:
        return None
    if title:
        rule.title = title
    if description:
        rule.description = description
    if pdf_filename:
        rule.pdf_filename = pdf_filename
    if image_filename:
        rule.image_filename = image_filename
    db.commit()
    db.refresh(rule)
    return rule

def delete_rule(db: Session, rule_id: int):
    rule = db.query(models.Rule).filter(models.Rule.id == rule_id).first()
    if not rule:
        return None
    db.delete(rule)
    db.commit()
    return rule

# --- Картки ---
def create_card(db: Session, id: str, name: str, description: str, quantity: int, team: str, imgUrl: str = None):
    db_card = models.Card(id=id, name=name, description=description, quantity=quantity, team=team, imgUrl=imgUrl)
    db.add(db_card)
    db.commit()
    db.refresh(db_card)
    return db_card

def get_cards(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Card).offset(skip).limit(limit).all()

def get_card(db: Session, card_id: str):
    return db.query(models.Card).filter(models.Card.id == card_id).first()

def update_card(db: Session, card_id: str, name: str = None, description: str = None, quantity: int = None, team: str = None, imgUrl: str = None):
    card = db.query(models.Card).filter(models.Card.id == card_id).first()
    if not card:
        return None
    if name:
        card.name = name
    if description:
        card.description = description
    if quantity is not None:
        card.quantity = quantity
    if team:
        card.team = team
    if imgUrl:
        card.imgUrl = imgUrl
    db.commit()
    db.refresh(card)
    return card

def delete_card(db: Session, card_id: str):
    card = db.query(models.Card).filter(models.Card.id == card_id).first()
    if not card:
        return None
    db.delete(card)
    db.commit()
    return card
