def clean_tree(node):
    cleaned = {
        "name": node["name"]
    }

    if "data" in node and node["data"] is not None:
        cleaned["data"] = node["data"]

    if "children" in node and node["children"]:
        cleaned["children"] = [
            clean_tree(child)
            for child in node["children"]
        ]

    return cleaned