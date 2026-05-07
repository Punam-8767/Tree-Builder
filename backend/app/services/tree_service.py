from sqlalchemy.orm import Session
from app.models.tree_model import Tree
from app.utils.tree_utils import clean_tree


def create_tree(db: Session, tree_data: dict):
    cleaned_tree = clean_tree(tree_data)

    new_tree = Tree(
        tree_data=cleaned_tree
    )

    db.add(new_tree)
    db.commit()
    db.refresh(new_tree)

    return new_tree


def get_all_trees(db: Session):
    return db.query(Tree).order_by(Tree.id.desc()).all()


def update_tree(db: Session, tree_id: int, tree_data: dict):
    tree = db.query(Tree).filter(Tree.id == tree_id).first()

    if not tree:
        return None

    cleaned_tree = clean_tree(tree_data)

    tree.tree_data = cleaned_tree

    db.commit()
    db.refresh(tree)

    return tree