from flask import request, make_response
from flask_restful import Resource
from models import db, Business
from sqlalchemy.exc import IntegrityError

class Businesses(Resource):

    def get(self):
        status = request.args.get('verification_status')

        if status:
            businesses = Business.query.filter_by(verification_status=status).all()
        else:
            businesses = Business.query.all()

        response = make_response(
            [business.to_dict() for business in businesses],
            200
        )
        return response

    def post(self):
        data = request.get_json()

        if not data:
            return make_response({"error": "No data provided"}, 400)

        if not data.get("name"):
            return make_response({"error": "name is required"}, 400)

        if not data.get("owner_id"):
            return make_response({"error": "owner_id is required"}, 400)

        try:
            new_business = Business(
                name=data["name"],
                owner_id=data["owner_id"],
                verification_status=data.get("verification_status", "pending")
            )

            db.session.add(new_business)
            db.session.commit()

            return make_response(new_business.to_dict(), 201)

        except IntegrityError:
            db.session.rollback()
            return make_response({"error": "Invalid owner_id or duplicate business"}, 400)
        


    def get(self, id):
        business = Business.query.filter_by(business_id=id).first()

        if not business:
            return make_response({"error": "Business not found"}, 404)

        return make_response(business.to_dict(), 200)

    def patch(self, id):
        business = Business.query.filter_by(business_id=id).first()

        if not business:
            return make_response({"error": "Business not found"}, 404)

        data = request.get_json()
        if not data:
            return make_response({"error": "No data provided"}, 400)

        allowed_fields = ["name", "verification_status"]

        for key, value in data.items():
            if key in allowed_fields:
                setattr(business, key, value)

        db.session.commit()
        return make_response(business.to_dict(), 200)

    def delete(self, id):
        business = Business.query.filter_by(business_id=id).first()

        if not business:
            return make_response({"error": "Business not found"}, 404)

        db.session.delete(business)
        db.session.commit()
        

        return make_response({"message": "Business deleted successfully"}, 200)

