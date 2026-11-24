"""Parse every Kubernetes manifest and print a summary (offline sanity check)."""
import sys
import yaml

for path in ["mysql.yaml", "backend.yaml", "frontend.yaml"]:
    with open(path) as f:
        for doc in yaml.safe_load_all(f):
            kind, name = doc["kind"], doc["metadata"]["name"]
            extra = ""
            if kind == "Deployment":
                extra = f"replicas={doc['spec']['replicas']}"
            if kind == "Service":
                extra = f"type={doc['spec'].get('type', 'ClusterIP')}"
            print(f"{path:14} {kind:22} {name:18} {extra}")
print("All manifests parsed successfully")
