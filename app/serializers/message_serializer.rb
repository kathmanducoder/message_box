class MessageSerializer < ActiveModel::Serializer
  attributes :id, :subject, :created_at
  belongs_to :sender, serializer: UserSerializer
  belongs_to :recipient, serializer: UserSerializer

  def created_at
    self.object.created_at.to_date
  end
end
