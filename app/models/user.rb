class User < ActiveRecord::Base
  has_secure_password

  validates :name, presence: true
  validates :username, presence: true
  validates :password, presence: true

  has_many :received_messages, class_name: "Message", foreign_key: "recipient_id"
  has_many :sent_messages, class_name: "Message", foreign_key: "sender_id"
end
