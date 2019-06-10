class MessageSerializer < ActiveModel::Serializer
  attributes :id, :subject, :content
  belongs_to :sender, serializer: UserSerializer
  belongs_to :recipient, serializer: UserSerializer
end
